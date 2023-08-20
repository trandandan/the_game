const axios = require('axios'); // Import the axios library for making HTTP requests

const serverUrl = "http://localhost:5500"; // Change the port if necessary

// Send an HTTP GET request using axios
axios
  .get(serverUrl)
  .then(response => {
    console.log("Response from Client2:", response.data);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });
