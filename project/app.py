from flask import Flask, send_from_directory, request, jsonify
import os
import json
import google.generativeai as genai



app = Flask(__name__) # Don't set static_folder or static_url_path here

# Calculate the absolute path to your dist folder
dist_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dist')  # Update path if needed

@app.route('/')
def index():
    return send_from_directory(dist_folder, 'index.html')
# Serve other static files (JS, CSS, etc.)



@app.route('/your-endpoint', methods=['POST'])
def get_data():
    print("Request Data:", request.get_data())
    genai.configure(api_key="AIzaSyDyHmwoa2glAwoMLjsdLc10RyJSttlQQyw")
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content("Say hello gemini!")
    print(response.text)
    a = response.text


    return json.dumps(
        {
            "data": a
        }
    )

@app.route('/<path:path>')
def serve_dist(path):
    if path != "" and os.path.exists(os.path.join(dist_folder, path)):
        return send_from_directory(dist_folder, path)
    else:  # If the path is empty or the file is not found, serve index.html
        return send_from_directory(dist_folder, 'index.html')



if __name__ == '__main__':
    app.run(debug=True)