const app = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const entry = require("./entry");
const company = require("./company");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || "secretevent", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post("/login", auth.login);
app.post("/register", auth.register);

app.post("/entry/add", entry.add);
app.get("/showAllEntries", entry.showAllEntries);
app.get("/entry/:id", entry.getEntryById);

app.get("/company", company.getAll);
app.post("/company", company.add);
app.get("/company/:id", company.getCompanyById);


module.exports = app;
