import requests

message = input("Please enter a message for client2 => ")

response = requests.post('http://127.0.0.1:5000/send_message', json={'message': message})

print(response.json())
