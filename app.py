import os
import json
import re
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from google import genai
from google.genai import types

app = Flask(__name__, static_folder=None)
CORS(app)

# --- CONFIGURATION ---
# Replace the string below with your ACTUAL API key starting with AIza...
# DO NOT include 'curl' or any other text from the Google snippet.
GEMINI_API_KEY = "AIzaSyDKCz2CfZxec3oe9VDey2I_2d5swCgkGk0"

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# Initialize Gemini Client directly with the string
client = genai.Client(api_key=GEMINI_API_KEY)

def extract_json(text):
    """Extracts JSON content from AI response."""
    try:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        return json.loads(match.group()) if match else None
    except:
        return None

@app.route("/predict", methods=["POST"])
def predict():
    print("📸 Image received for analysis...")
    
    if "file" not in request.files:
        return jsonify({"error": "No image found"}), 400

    image_file = request.files["file"]
    image_bytes = image_file.read()
    
    # Ensure a valid mime type
    m_type = image_file.content_type if image_file.content_type else "image/jpeg"
    
    prompt = """
    Analyze this plant leaf. Return ONLY a JSON object:
    {
      "disease": "Name of disease",
      "confidence": 0-100,
      "treatment": "Short treatment steps",
      "prevention": "Prevention tips"
    }
    """

    try:
        response = client.models.generate_content(
            model="models/gemini-2.5-flash",
            contents=[
                prompt,
                types.Part.from_bytes(data=image_bytes, mime_type=m_type)
            ]
        )
        
        # Log response for debugging
        print("AI Response:", response.text)
        
        data = extract_json(response.text)
        if data:
            return jsonify(data)
        else:
            return jsonify({"error": "AI returned invalid format"}), 500
            
    except Exception as e:
        print(f"🔥 AI Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

# --- ROUTING SYSTEM ---

@app.route("/")
def home():
    return send_from_directory(os.path.join(BASE_DIR, "frontpage"), "index.html")

@app.route("/<path:path>")
def static_proxy(path):
    # Searches for assets in these specific directories
    folders = ["frontpage", "userdashboard", "login-signup", ""]
    for folder in folders:
        full_path = os.path.join(BASE_DIR, folder, path)
        if os.path.exists(full_path) and not os.path.isdir(full_path):
            return send_from_directory(os.path.join(BASE_DIR, folder), path)
    return "Not Found", 404

if __name__ == "__main__":
    print(f"🚀 Server starting... Using API Key: {GEMINI_API_KEY[:5]}...")
    app.run(debug=True, port=5000)