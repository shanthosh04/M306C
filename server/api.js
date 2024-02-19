const app = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const entry = require("./entry");
const company = require("./company");
const { executeSQL } = require("./database");



const addentries = async (req, res) => {
  const { firstname, lastname, imageApplicant, address, cityAndZip, country, field, classname, qvYear, certificate, noteQV, intershipContract, efzCopy, legalGuardian, applicationDate, intershipCompany, responsiblePerson, applicationStatus, interviewDate, trialVisitDate, contractCreationDate, internshipSalary1, internshipSalary2, mbaApprovalDate, birthDate, ahvNumber } = req.body;
  const userId = 1;
  console.log(userId)
  const query = `INSERT INTO entries(user_id, firstname, lastname, imageApplicant, address, cityAndZip, country, field, classname, qvYear, certificate, noteQV, internshipContract, efzCopy, legalGuardian, applicationDate, internshipCompany, responsiblePerson, applicationStatus, interviewDate, trialVisitDate, contractCreationDate, internshipSalary1, internshipSalary2, mbaApprovalDate, birthDate, ahvNumber) VALUES ( 1, "${firstname}", "${lastname}", "${imageApplicant}", "${address}", "${cityAndZip}", "${country}", "${field}", "${classname}", "${qvYear}", "${certificate}", "${noteQV}", "${intershipContract}", "${efzCopy}", "${legalGuardian}", "${applicationDate}", "${intershipCompany}", "${responsiblePerson}", "${applicationStatus}", "${interviewDate}", "${trialVisitDate}", "${contractCreationDate}", ${internshipSalary1}, ${internshipSalary2}, "${mbaApprovalDate}", "${birthDate}", "${ahvNumber}");`;
  try {
    const result = await executeSQL(query, firstname, lastname, imageApplicant, address, cityAndZip, country, field, classname, qvYear, certificate, noteQV, intershipContract, efzCopy, legalGuardian, applicationDate, intershipCompany, responsiblePerson, applicationStatus, interviewDate, trialVisitDate, contractCreationDate, internshipSalary1, internshipSalary2, mbaApprovalDate, birthDate, ahvNumber );
    if (result.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Ereignis konnte nicht erstellt werden" });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler bei der Ereigniserstellung" });
  }
};

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
app.post("/addentries", addentries);
app.post("/addCompany", company.addCompany);
app.get("/showAllEntries", entry.showAllEntries)

module.exports = app;
