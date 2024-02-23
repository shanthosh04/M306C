const app = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const entry = require("./entry");
const company = require("./company");

app.post("/login", auth.login);
app.post("/register", auth.register);

app.post("/entry", entry.add);
app.get("/entry", entry.showAllEntries);
app.get("/entry/:id", entry.getEntryById);
app.put("/entry/:id", entry.edit);
app.delete("/entry/:id", entry.remove);

app.get("/company", company.getAll);
app.post("/company", company.add);
app.get("/company/:id", company.getCompanyById);
app.put("/company/:id", company.edit);
app.delete("/company/:id", company.remove);

module.exports = app;
