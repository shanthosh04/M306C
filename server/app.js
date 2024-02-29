require("dotenv").config();
const express = require("express");
const http = require("http");
const api = require("./api");
const {
  initializeMariaDB,
  initializeDBSchema,
  executeSQL,
} = require("./database");
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
app.get("/companyEdit/:companyId", (req, res) =>
  res.sendFile(newPath + "editCompany.html")
);
app.get("/editEntries/:entryId", (req, res) =>
  res.sendFile(newPath + "editEntries.html")
);

app.get("/error/:status", (req, res) => {
  const { status } = req.params;
  res.sendFile(newPath + "error.html");
});

const student = (first, last) =>
  `,("${first}", "${last}", "${first.toLowerCase()}.${last.toLowerCase()}@modul.local", "Admin123", "student")`;

app.get("/seed/users", async (req, res) => {
  const query = `
  INSERT INTO users
  (firstname, lastname, email, password, role)
  VALUES
  ("Dimitri", "Steiner", "dimitri.steiner@modul.local", "Admin123", "admin")
  ,("Musa", "Khan", "musa.khan@modul.local", "Admin123", "admin")
  ,("Keith", "Hager", "keith.hager@modul.local", "Admin123", "admin")
  ${student("Lars", "Gerencser") +
    student("Noah", "Wernli") +
    student("Boran", "Sancar") +
    student("Shanthosh", "Sivasenthinathan") +
    student("Yusuf", "Khurshid") +
    student("Ilja", "Pidonenko") +
    student("Basil", "Eyholzer") +
    student("Riza", "Cavdar") +
    student("Doruk", "Yildirim")}`;
  await executeSQL(query)
  const result = await executeSQL(`SELECT * FROM users`)
  res.json(result);
});

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