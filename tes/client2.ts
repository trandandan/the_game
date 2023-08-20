// Import required modules
const express = require('express');
import * as readline from "readline"; // Import readline module as named import

// Create an Express app
const app = express();
const port = 5500; // Use the same port as in the client

// Create a readline interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,   // Read input from standard input (keyboard)
  output: process.stdout  // Write output to standard output (console)
});

// Prompt user to enter the dynamic message
rl.question("Enter the dynamic message: ", (message: string) => {
  // Define an Express route that responds with the entered message
  app.get("/", (req, res) => {
    res.send(message);
  });

  // Start the Express app listening on the specified port
  app.listen(port, () => {
    console.log(`Client2's server is running on port ${port}`);
  });

  // Close the readline interface after receiving user input
  rl.close();
});
