from flask import Flask, render_template, request, send_from_directory
from gtts import gTTS
import os
import uuid

app = Flask(__name__)

# Set up cache directory on D: drive
CACHE_DIR = "D:/voice_cache"
os.makedirs(CACHE_DIR, exist_ok=True)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/speak', methods=['POST'])
def speak():
    text = request.form['text']
    if not text.strip():
        return "Please enter some text.", 400

    filename = f"{uuid.uuid4()}.mp3"
    filepath = os.path.join(CACHE_DIR, filename)

    tts = gTTS(text)
    tts.save(filepath)

    # Render the same index page but pass the filename
    return render_template('index.html', filename=filename)


@app.route('/audio/<filename>')
def audio(filename):
    return send_from_directory(CACHE_DIR, filename)

if __name__ == '__main__':
    app.run(debug=True)
