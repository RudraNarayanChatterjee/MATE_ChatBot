import eel


from Heart.talk_func import *
from Heart.features import *
from Heart.db import *



eel.init("Ui")




eel.start('index.html', size=(1920, 1080),port=8001,  chromeFlags=["--start-fullscreen"])