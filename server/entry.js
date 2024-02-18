const { executeSQL } = require("./database");

const addEntry = async (req, res) => {
  const {
    firstname,
    lastname,
    imageApplicant,
    address,
    cityAndZip,
    country,
    field,
    classname,
    qvYear,
    certificate,
    noteQV,
    intershipContract,
    efzCopy,
    legalGuardian,
    applivationDate,
    intershipCompany,
    responsiblePerson,
    applicationStatus,
    interviewDate,
    trialVisitDate,
    contractCreationDate,
    internshipSalary1,
    internshipSalary2,
    mbaApprovalDate,
    birthDate,
    ahvNumber,
  } = req.body;
  const userId = 1;
  console.log(userId);
  const query = `INSERT INTO entries(user_id, firstname, lastname, imageApplicant, address, cityAndZip, country, field, classname, qvYear, certificate, noteQV, internshipContract, efzCopy, legalGuardian, applicationDate, internshipCompany, responsiblePerson, applicationStatus, interviewDate, trialVisitDate, contractCreationDate, internshipSalary1, internshipSalary2, mbaApprovalDate, birthDate, ahvNumber) VALUES ( 1, "${firstname}", "${lastname}", "${imageApplicant}", "${address}", "${cityAndZip}", "${country}", "${field}", "${classname}", 2000, "${certificate}", "${noteQV}", "${intershipContract}", "${efzCopy}", "${legalGuardian}", "2023-01-01", "${intershipCompany}", "${responsiblePerson}", "${applicationStatus}", "2023-01-01", "2023-01-01", "2023-01-01", 333, 3332, "2023-01-01", "2023-01-01", 3333);`;
  try {
    const result = await executeSQL(query);
    if (result.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res.json({
        success: false,
        message: "Ereignis konnte nicht erstellt werden",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler bei der Ereigniserstellung" });
  }
};

module.exports = { addEntry };
