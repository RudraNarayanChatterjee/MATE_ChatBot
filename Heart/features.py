import eel
import os
import webbrowser
import datetime
import cv2
import wikipedia
import pywhatkit as kit
import time
import subprocess
from Heart.db import connect_db, add_site, get_sites
from Heart.talk_func import *

# Initialize the database at startup
connect_db()

# Example of adding new sites to the database

# add_site("Site name", "Site's url here")
#Ex--
# add_site("google", "https://www.google.com/")
# add_site("youtube", "https://www.youtube.com/")



@eel.expose
# Wishing Function  
def start_up():
    hour = int(datetime.datetime.now().hour)
    if hour >= 3 and hour < 12:
        say("Good morning! Sir.")      
    elif hour == 12 :
        say("Good noon! Sir.")      
    elif hour > 12 and hour < 18:
        say("Good afternoon! Sir.")    
    elif hour >= 18 and hour < 21:
        say("Good evening! Sir.")    
    else:
        say("Good night! Sir.")
        
    time.sleep(1)
    say("Hello sir. I am mate!")

# Variable to track if the camera is already open
camera_open = False
def open_camera():
    global camera_open
    
    if camera_open:
        say("Camera is already open.")
        return
    
    # Set camera_open to True when the camera starts
    camera_open = True
    cap = cv2.VideoCapture(0)  # 0 is usually the default camera
    
    if not cap.isOpened():
        say("Sorry, I couldn't access the camera.")
        camera_open = False  # Reset state if the camera fails to open
        return

    say("Press 'q' to close the camera.")
    
    while camera_open:
        ret, frame = cap.read()
        if not ret:
            say("Failed to grab frame.")
            break
        cv2.imshow('Camera', frame)

        # Check for 'q' press to close the camera
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    
    # Set camera_open to False when the camera closes
    camera_open = False
    say("Camera closed.")

# Fuction For searching things on wikipedia
def search_wikipedia(query):
    say("Searching for your answer...")
    try:
        results = wikipedia.summary(query, sentences=2)  # Get summary of 2 sentences
        print(results)
        say(results)
    except wikipedia.DisambiguationError as e:
        say("There are multiple results for this term. Please be more specific.")
    except wikipedia.exceptions.PageError:
        say("Sorry, I couldn't find any results on Wikipedia for that.")

# Fuction For WhatsApp facilities
def send_whatsapp_message():
    msg= listen()
    kit.sendwhatmsg("+919735006311",f"Rudra: {msg}",21,14)


def chat_with_gemma(user_input):
    try:
        result = subprocess.run(
            ['ollama', 'run', 'gemma2:2b'],
            input=user_input,
            text=True,
            capture_output=True
        )
        return result.stdout.strip()
    except Exception as e:
        return f"Error: {str(e)}"

def sanitize_response(text):
    # Remove unwanted asterisks or other formatting characters
    sanitized_text = text.replace('*', '')
    return sanitized_text

@eel.expose
def audio_input():
    text= listen()
    Mate_funcs(text)
    eel.micreverse()

@eel.expose
def text_input(Prompt):
    text= Prompt
    Mate_funcs(text)
    




@eel.expose
def Mate_funcs(text):
    
        print("Listening...")
        eel.displayFunc("Listening...")
        

        eel.displayFunc(text)  # Show the user input 
        eel.senderText(text)


        # Fetch the sites from the database
        sites = get_sites()
        # Try to open any site that matches the input
        site_opened = False
        for site in sites:
            if f"open {site[0].strip().lower()}" in text.lower():
                say(f"Opening {site[0]}...")
                
                print(f"Opening URL: {site[1]}")  # Debug print statement to check URL
                try:
                    webbrowser.open_new(site[1])  # Changed to `open()` instead of `open_new()`
                    site_opened = True
                except Exception as e:
                    print(f"Failed to open {site[0]}: {e}")
                    say(f"Failed to open {site[0]}.")
                break  # Exit loop after finding the correct site

        # If no site matched, continue with other features
        if not site_opened:


            if "Who are You".lower() in text.lower():
                say("I  am  MATE  your  assistant . I am coded,  designed  and  developed  by . Rudra . A.K.A  Babai")

            elif "the time".lower() in text.lower():
                time=datetime.datetime.now().strftime("%H:%M:%S")
                say(f"Sir the time is{time}")
            
            elif "open camera".lower() in text.lower():
                say("Opening the camera, sir.")
                open_camera()
                
            elif text.lower().startswith("according to wikipedia") or text.lower().endswith("according to wikipedia"):
                search_term = text.replace("according to wikipedia", "").replace("what is", "").replace("who is", "").replace("which is", "").replace("what was", "").replace("who was", "").replace("which was", "").strip()
                search_wikipedia(search_term)

            elif "send a whatsapp message".lower() in text.lower():
                send_whatsapp_message()


            elif "sleep now".lower() in text.lower():
                say(f"Goodbye! Sir.")
                eel.displayFunc("Goodbye! Sir.")
                time.sleep(1)
                exit()
            
            else:
                response = chat_with_gemma(text)
                clean_response = sanitize_response(response)
                print(response)
                say(clean_response)
            
            
        print("Listening...")
        eel.displayFunc("Listening...")





        