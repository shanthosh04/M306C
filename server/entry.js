const { executeSQL } = require("./database");

const add = async (req, res) => {
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
    internshipContract,
    efzCopy,
    legalGuardian,
    applicationDate,
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

  const values = [
    1, firstname, lastname, imageApplicant, address, cityAndZip, country, field, classname,
    qvYear, certificate, noteQV, internshipContract || null, efzCopy, legalGuardian || null, applicationDate,
    intershipCompany, responsiblePerson, applicationStatus, interviewDate, trialVisitDate,
    contractCreationDate || null,
    internshipSalary1, internshipSalary2, mbaApprovalDate || null, birthDate, ahvNumber
  ];

  const userId = 1;
  console.log(userId);
  const query = `INSERT INTO entries(user_id, firstname, lastname, imageApplicant, address, cityAndZip, country, field, classname, qvYear, certificate, noteQV, internshipContract, efzCopy, legalGuardian, applicationDate, internshipCompany, responsiblePerson, applicationStatus, interviewDate, trialVisitDate, contractCreationDate, internshipSalary1, internshipSalary2, mbaApprovalDate, birthDate, ahvNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  try {
    const result = await executeSQL(query, values);
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


const showAllEntries = async (req, res) => {
  const allCompanies = await executeSQL('SELECT * FROM entries');
  const result = allCompanies;

  res.json(result);
}

const getEntryById = async (req, res) => {
  const entryId = req.params.id;
  const query = `SELECT * FROM entries WHERE id = ${entryId}`;
  try {
    const result = await executeSQL(query);
    if (result.length === 1) {
      res.json(result[0]);
    } else {
      res.status(404).json({ error: "Eintrag nicht gefunden" });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler beim Abrufen des Eintrags" });
  }
};

module.exports = { add, showAllEntries, getEntryById };

