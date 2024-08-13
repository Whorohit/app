// // const express = require('express');
// // const app = express();
// // const port = 3000;
// // const cors = require('cors');
// // const path = require('path'); 
// // app.use(cors()); // Allow CORS for all routes by default
// // // Route for the home page
// // app.get('/', (req, res) => {
// //   res.send('Hello, World!');
// // });

// // // Start the server
// // app.use(express.static('public'));

// // // Route to send the JavaScript file
// // // app.get('/adPopup.js', (req, res) => {
// //     // res.sendFile(path.join(__dirname, 'adPopup.js'));
// // // });

// // app.listen(port, () => {
// //   console.log(`Server is running on http://localhos/t:${port}`);
// // });

// const express = require('express');
// const app = express();
// const port = 3000;
// const cors = require('cors');

// // Allow CORS for all routes by default
// app.use(cors({
//   origin: '*', // Allow all origins (for development purposes)
// }));

// // Serve static files from the 'public' directory
// app.use(express.static('public')); 

// // Route for the home page
// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });


const http = require('http');

// File system module used for accessing files in nodejs
const fs = require("fs");  
const port = 3000;

// Helper function 
function readAndServe(path, res)   
{
    fs.readFile(path,function(err, data)
    {
        console.log(data);

        // res.setHeader('Content-Type', 'text/html');
        res.end(data);
    })
}
const server = http.createServer((req, res) => {  
  const url = req.url;
  const method = req.method;

  /* Serving static files on specific Routes */
  if(url === "/") 
  {
      readAndServe("./index.html",res) 

      /* The file named index.html will be sent 
         as a response when the index url is requested */
  }
  else if(url === "/about")
  {
      readAndServe("./about.html",res) 
      /*The about.html file will be sent as a response when 
        /about is requested */
  }
  else
  {
      res.end("Path not found"); 
      /* All paths other than / and /about will send an error as 
      a response */
  }
});
server.listen(port, () => {
  console.log(`Server running at http://:${port}/`);
});