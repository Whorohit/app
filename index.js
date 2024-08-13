// // // const express = require('express');
// // // const app = express();
// // // const port = 3000;
// // // const cors = require('cors');
// // // const path = require('path'); 
// // // app.use(cors()); // Allow CORS for all routes by default
// // // // Route for the home page
// // // app.get('/', (req, res) => {
// // //   res.send('Hello, World!');
// // // });

// // // // Start the server
// // // app.use(express.static('public'));

// // // // Route to send the JavaScript file
// // // // app.get('/adPopup.js', (req, res) => {
// // //     // res.sendFile(path.join(__dirname, 'adPopup.js'));
// // // // });

// // // app.listen(port, () => {
// // //   console.log(`Server is running on http://localhos/t:${port}`);
// // // });

// // const express = require('express');
// // const app = express();
// // const port = 3000;
// // const cors = require('cors');

// // // Allow CORS for all routes by default
// // app.use(cors({
// //   origin: '*', // Allow all origins (for development purposes)
// // }));

// // // Serve static files from the 'public' directory
// // app.use(express.static('public')); 

// // // Route for the home page
// // app.get('/', (req, res) => {
// //   res.send('Hello, World!');
// // });

// // // Start the server
// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhost:${port}`);
// // });


// const express = require('express') 
// const path = require('path') 
// const app = express() 

// // Static Middleware 
// app.use(express.static(path.join(__dirname, 'public'))) 

// // View Engine Setup 
// app.set('views', path.join(__dirname, 'views')) 
// app.set('view engine', 'ejs') 

// app.get('/', function(req, res){ 
// 	res.render('Demo') 
// }) 

// app.listen(8080, function(error){ 
// 	if(error) throw error 
// 	console.log("Server created Successfully") 
// }) 

const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});
