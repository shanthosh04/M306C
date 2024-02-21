require("dotenv").config();
const express = require("express");
const http = require("http");
const api = require("./api");
const { initializeMariaDB, initializeDBSchema } = require("./database");
const cors = require("cors");

// Create the express server
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

// deliver static files from the client folder like css, js, images
app.use(express.static("client"));

const newPath = __dirname.slice(0, -6) + "/client/html/";

// route for the homepage
app.get("/", (req, res) => res.sendFile(newPath + "index.html"));
app.get("/homepage", (req, res) => res.sendFile(newPath + "homepage.html"));
app.get("/company/create", (req, res) =>
  res.sendFile(newPath + "addCompany.html")
);
app.get("/newForm", (req, res) => res.sendFile(newPath + "addentries.html"));
app.get("/request", (req, res) => res.sendFile(newPath + "acceptEntries.html"));
app.get("/company", (req, res) => res.sendFile(newPath + "showCompany.html"));
app.get("/register", (req, res) => res.sendFile(newPath + "register.html"));
app.get("/companyDetail/:companyId", (req, res) =>
  res.sendFile(newPath + "CompanyDetail.html")
);
app.get("/entryDetail/:entryId", (req, res) =>
  res.sendFile(newPath + "entriesDetail.html")
);

// Initialize the REST api
app.use("/api", api);

// Initialize the database
initializeMariaDB();
initializeDBSchema();

//start the web server
const serverPort = process.env.PORT || 3000;
server.listen(serverPort, "0.0.0.0", () => {
  console.log(`Express Server started on http://localhost:${serverPort}/`);
});
