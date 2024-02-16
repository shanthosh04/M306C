const jwt = require('jsonwebtoken');
const { executeSQL } = require("./database");

const initializeAPI = (app) => {
  app.post("/api/login", login);
  app.post("/api/register", register);
  app.post("/api/addCompany", addCompany);
};

const addCompany = async (req, res) => {
  const { companyName, companyCity, companyStreet, companyDescription, contactPerson, companyEmail, companyPhone, companyField } = req.body;
  const query = `INSERT INTO companys (companyName, companyCity, companyStreet, companyDescription, contactPerson, companyEmail, companyPhone, companyField) VALUES ("${companyName}", "${companyCity}", "${companyStreet}", "${companyDescription}", "${contactPerson}", "${companyEmail}", "${companyPhone}", "${companyField}")`;
  try {
    const result = await executeSQL(query);
    if (result.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Die Stadt konnte nicht hinzugefügt werden" });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler bei dem Ablauf" });
  }
};

const register = async (req, res) => {
  const { firstname, lastname, birthdate, street, zipcode, city, email, password } = req.body;
  const query = `INSERT INTO users (firstname, lastname, birthdate, street, zipcode, city, email, password) VALUES ("${firstname}", "${lastname}", "${birthdate}", "${street}", "${zipcode}", "${city}", "${email}", "${password}")`;
  try {
    const result = await executeSQL(query);
    if (result.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Benutzer konnte nicht registriert werden" });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler bei der Registrierung" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email = "${email}" AND password = "${password}"`;
  try {
    const users = await executeSQL(query);
    if (users.length === 1) {
      const user = users[0];
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'secretevent',
        { expiresIn: '1h' }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Authentifizierung fehlgeschlagen" });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler beim Login" });
  }
};

module.exports = { initializeAPI };
