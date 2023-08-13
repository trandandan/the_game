# Import the necessary modules from Flask
from flask import Flask, request, jsonify

# Create a Flask app instance
app = Flask(__name__)

# Temporary storage for the message
stored_message = None

# Define a route to receive messages from Client1
@app.route('/send_message', methods=['POST'])
def send_message():
    global stored_message
    data = request.json
    message = data.get('message')
    stored_message = message
    return jsonify({'status': 'Message received'})

# Define a route to retrieve the message for Client2
@app.route('/get_message', methods=['GET'])
def get_message():
    global stored_message
    return jsonify({'message': stored_message})

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
