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

const getCompanyById = async (req, res) => {
  const companyId = req.params.id; // Die ID der Firma aus den Routenparametern abrufen
  const query = `SELECT * FROM companys WHERE id = ${companyId}`;
  try {
    const result = await executeSQL(query);
    if (result.length === 1) {
      res.json(result[0]); // Nur die erste gefundene Firma zurückgeben (es sollte nur eine sein, da es sich um eine eindeutige ID handelt)
    } else {
      res.status(404).json({ error: "Firma nicht gefunden" });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler beim Abrufen der Firma" });
  }
};

module.exports = { add, getAll, getCompanyById };

