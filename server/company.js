const { executeSQL } = require("./database");

const add = async (req, res) => {
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
  const query = `
INSERT INTO companys
(companyName, companyCity, companyStreet, companyDescription, contactPerson, companyEmail, companyPhone, companyField)
VALUES
("${companyName}", "${companyCity}", "${companyStreet}", "${companyDescription}", "${contactPerson}", "${companyEmail}", "${companyPhone}", "${companyField}")`;
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
const getAll = async (req, res) => {
  const result = await executeSQL(`SELECT * FROM companys`);
  res.json(result);
};

module.exports = { add, getAll };

