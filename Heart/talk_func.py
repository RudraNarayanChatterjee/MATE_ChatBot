import speech_recognition as sr
import os
from gtts import gTTS
import subprocess
import eel
import re

def remove_emojis(text):
    return re.sub(r'[^\w\s,.]', '', text)  # Removes emojis and special characters


def say(text, lang='en'):
    eel.displayFunc(text)
    eel.receiverText(text)
    clean_text = remove_emojis(text)  # Clean the text
    tts = gTTS(text=clean_text, lang=lang)
    tts.save("output.mp3")
    os.system("ffplay -nodisp -autoexit output.mp3")
    
    


def listen():
    print("Listening...")

    r = sr.Recognizer()
    with sr.Microphone() as source:
        r.pause_threshold= 1.5
        audio = r.listen(source)
        print("Recognizing...")
        eel.displayFunc("Recognizing...")
        try:
            query = r.recognize_google(audio, language="en-in")
            print(f"Babai: {query}")
            return query
        except sr.UnknownValueError:
            say("Speak louder friend ...Google Speech Recognition could not understand the audio.")
            return "Say Sorry try again after this and speak louder friend"
        except sr.RequestError as e:
            print(f"Could not request results; {e}")
            return "Say Sorry try again after this and speak louder friend"
        
 
    