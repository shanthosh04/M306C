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
    intershipContract,
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
  const userId = 1;
  console.log(userId);
  const query = `INSERT INTO entries(user_id, firstname, lastname, imageApplicant, address, cityAndZip, country, field, classname, qvYear, certificate, noteQV, internshipContract, efzCopy, legalGuardian, applicationDate, internshipCompany, responsiblePerson, applicationStatus, interviewDate, trialVisitDate, contractCreationDate, internshipSalary1, internshipSalary2, mbaApprovalDate, birthDate, ahvNumber) VALUES ( 1, "${firstname}", "${lastname}", "${imageApplicant}", "${address}", "${cityAndZip}", "${country}", "${field}", "${classname}", "${qvYear}", "${certificate}", "${noteQV}", "${intershipContract}", "${efzCopy}", "${legalGuardian}", "${applicationDate}", "${intershipCompany}", "${responsiblePerson}", "${applicationStatus}", "${interviewDate}", "${trialVisitDate}", "${contractCreationDate}", ${internshipSalary1}, ${internshipSalary2}, "${mbaApprovalDate}", "${birthDate}", "${ahvNumber}");`;
  try {
    const result = await executeSQL(
      query,
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
      ahvNumber
    );
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

module.exports = { add, showAllEntries };

