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
    1,
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
    internshipContract ? internshipContract : null,
    efzCopy,
    legalGuardian ? legalGuardian : null,
    applicationDate,
    intershipCompany,
    responsiblePerson,
    applicationStatus,
    interviewDate,
    trialVisitDate,
    contractCreationDate ? contractCreationDate : null,
    internshipSalary1,
    internshipSalary2,
    mbaApprovalDate ? mbaApprovalDate : null,
    birthDate,
    ahvNumber,
  ];

  const userId = 1;
  console.log(userId);
  const query = `
  INSERT INTO entries
  (user_id, firstname, lastname, imageApplicant, address, cityAndZip, country, field, classname, qvYear, certificate, noteQV, internshipContract, efzCopy, legalGuardian, applicationDate, internshipCompany, responsiblePerson, applicationStatus, interviewDate, trialVisitDate, contractCreationDate, internshipSalary1, internshipSalary2, mbaApprovalDate, birthDate, ahvNumber)
  VALUES
  ( 1, "${firstname}", "${lastname}", "${imageApplicant}", "${address}", "${cityAndZip}", "${country}", "${field}", "${classname}", "${qvYear}", "${certificate}", "${noteQV}", "${internshipContract}", "${efzCopy}", "${legalGuardian}", "${applicationDate}", "${intershipCompany}", "${responsiblePerson}", "${applicationStatus}", "${interviewDate}", "${trialVisitDate}", "${contractCreationDate}", ${internshipSalary1}, ${internshipSalary2}, "${mbaApprovalDate}", "${birthDate}", "${ahvNumber}");`;
  console.log(query);
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
  const allCompanies = await executeSQL("SELECT * FROM entries");
  const result = allCompanies;

  res.json(result);
};

const getEntryById = async (req, res) => {
  const entryId = req.params.id; // Die ID der Firma aus den Routenparametern abrufen
  const query = `SELECT * FROM entries WHERE id = ${entryId}`;
  try {
    const result = await executeSQL(query);
    if (result.length === 1) {
      res.json(result[0]); // Nur die erste gefundene Firma zurückgeben (es sollte nur eine sein, da es sich um eine eindeutige ID handelt)
    } else {
      res.status(404).json({ error: "Eintrag nicht gefunden" });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler beim Abrufen des Eintrags" });
  }
};

const edit = async (req, res) => {
  const { id } = req.params;
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
  await executeSQL(`
  UPDATE entries
  SET
  user_id = 1,
  firstname = "${firstname}",
  lastname = "${lastname}",
  imageApplicant = "${imageApplicant}",
  address = "${address}",
  cityAndZip = "${cityAndZip}",
  country = "${country}",
  field = "${field}",
  classname = "${classname}",
  qvYear = "${qvYear}",
  certificate = "${certificate}",
  noteQV = "${noteQV}",
  internshipContract = "${internshipContract}",
  efzCopy = "${efzCopy}",
  legalGuardian = "${legalGuardian}",
  applicationDate = "${applicationDate}",
  internshipCompany = "${intershipCompany}",
  responsiblePerson = "${responsiblePerson}",
  applicationStatus = "${applicationStatus}",
  interviewDate = "${interviewDate}",
  trialVisitDate = "${trialVisitDate}",
  contractCreationDate = "${contractCreationDate}",
  internshipSalary1 = "${internshipSalary1}",
  internshipSalary2 = "${internshipSalary2}",
  mbaApprovalDate = "${mbaApprovalDate}",
  birthDate = "${birthDate}",
  ahvNumber = "${ahvNumber}"
  WHERE id = ${id}`);
  res.json({ message: "OK", id });
};

const remove = async (req, res) => {
  const { id } = req.params;
  await executeSQL(`DELETE FROM entries WHERE id = ${id}`);
  res.json({ message: "OK", id });
};

module.exports = { add, showAllEntries, getEntryById, edit, remove };
