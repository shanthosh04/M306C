const express = require("express");
const http = require("http");
const { initializeAPI } = require("./api");
const { initializeMariaDB, initializeDBSchema } = require("./database"); 

// Create the express server
const app = express();
app.use(express.json());
const server = http.createServer(app);

// deliver static files from the client folder like css, js, images
app.use(express.static("client"));

// route for the homepage
app.get("/", (req, res) => {
  const newPath = __dirname.slice(0, -6);
  res.sendFile(newPath + "/client/html/index.html");
  
  app.get("/homepage", (req, res) => {
    res.sendFile(newPath + "/client/html/homepage.html");
  });

  app.get("/company/create", (req, res) => {
    res.sendFile(newPath + "/client/html/addCompany.html");
  });

  app.get("/newForm", (req, res) => {
    res.sendFile(newPath + "/client/html/addentries.html");
  });

  app.get("/request", (req, res) => {
    res.sendFile(newPath + "/client/html/acceptEntries.html");
  });

  app.get("/company", (req, res) => {
    res.sendFile(newPath + "/client/html/showCompany.html");
  });

  app.get("/register", (req, res) => {
    res.sendFile(newPath + "/client/html/register.html");
  });
});



// Initialize the REST api
initializeAPI(app);

// Initialize the database
initializeMariaDB();
initializeDBSchema();

//start the web server
const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`Express Server started on port ${serverPort}`);
});
