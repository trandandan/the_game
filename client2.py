# Import the necessary module for making HTTP requests
import requests

# Send a GET request to the server's /get_message endpoint
response = requests.get('http://127.0.0.1:5000/get_message')

# Parse the response JSON and retrieve the message
data = response.json()
message = data.get('message', 'No message available')

# Checking the response is it 1 or 2
if message == "1":
    movement = "paddle speed-up"
elif message == "2":
    movement = "paddle slow-down"
else:
    movement = "no movement"
# Display the retrieved message
print("Message from Client1:", movement)
