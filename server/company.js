const { executeSQL } = require("./database");

const addCompany = async (req, res) => {
  const {
    companyName,
    companyCity,
    companyStreet,
    companyDescription,
    contactPerson,
    companyEmail,
    companyPhone,
    companyField,
  } = req.body;
  const query = `INSERT INTO companys (companyName, companyCity, companyStreet, companyDescription, contactPerson, companyEmail, companyPhone, companyField) VALUES ("${companyName}", "${companyCity}", "${companyStreet}", "${companyDescription}", "${contactPerson}", "${companyEmail}", "${companyPhone}", "${companyField}")`;
  try {
    const result = await executeSQL(query);
    if (result.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res.json({
        success: false,
        message: "Die Stadt konnte nicht hinzugefügt werden",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler bei dem Ablauf" });
  }
};

const showAllCompanies = async (req, res) => {
  const allCompanies = await executeSQL('SELECT * FROM entries');
  const result = allCompanies;

  res.json(result);
}

module.exports = { addCompany, showAllCompanies };
