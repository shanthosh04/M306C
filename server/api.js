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