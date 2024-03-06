<<<<<<< HEAD
const app = require("express").Router();
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
=======
const app = require("express").Router();
const auth = require("./auth");
const entry = require("./entry");
const company = require("./company");
const { authenticateToken } = require("./middleware");

app.post("/login", auth.login);
app.post("/register", auth.register);

app.post("/entry", authenticateToken(), entry.add);
app.get("/entry", authenticateToken(), entry.showAllEntries);
app.get("/entry/:id", authenticateToken(), entry.getEntryById);
app.put("/entry/:id", authenticateToken("admin"), entry.edit);
app.delete("/entry/:id", authenticateToken("admin"), entry.remove);

app.get("/company", authenticateToken(), company.getAll);
app.post("/company", authenticateToken("admin"), company.add);
app.get("/company/:id", authenticateToken(), company.getCompanyById);
app.put("/company/:id", authenticateToken("admin"), company.edit);
app.delete("/company/:id", authenticateToken("admin"), company.remove);

app.post("/auth", authenticateToken(), (req, res) => {
  const { user } = req;
  res.json({ status: 200, user });
});

module.exports = app;
>>>>>>> 1dd66587e0da4731dc0620c3ddce5c2ab8a18a72
