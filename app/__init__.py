from flask import Flask
from dotenv import load_dotenv

load_dotenv()

def create_app()->Flask:
    app = Flask(__name__,static_folder="./static/", template_folder="./templates/")
    
    import os
    app.config["SECRET_KEY"] = os.environ["SECRET_KEY"]

    return app
