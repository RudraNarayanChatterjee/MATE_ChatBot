import speech_recognition as sr
import os
import pyttsx3
import eel


engine = pyttsx3.init('espeak')
# rate = engine.getProperty('rate')   
# print (rate)                        
engine.setProperty('rate', 140)  
# volume = engine.getProperty('volume')   
# print (volume)                          
engine.setProperty('volume',1.0)   
voices = engine.getProperty('voices')    
# print (voices)    
engine.setProperty('voice', voices[12].id) 
engine.setProperty('pitch', 200)

def say(text):
    eel.displayFunc(text)
    engine.say(text)
    eel.receiverText(text)
    engine.runAndWait()
    


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
        
 
    