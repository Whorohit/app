// const express = require('express');
// const app = express();
// const port = 3000;
// const cors = require('cors');
// const path = require('path'); 
// app.use(cors()); // Allow CORS for all routes by default
// // Route for the home page
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // Start the server
// app.use(express.static('public'));

// // Route to send the JavaScript file
// // app.get('/adPopup.js', (req, res) => {
//     // res.sendFile(path.join(__dirname, 'adPopup.js'));
// // });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

// Allow CORS for all routes by default
app.use(cors()); 

// Serve static files from the 'public' directory
app.use(express.static('public')); 

// Route for the home page
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

