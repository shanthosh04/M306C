const jwt = require("jsonwebtoken");
const { executeSQL } = require("./database");

const register = async (req, res) => {
  const {
    firstname,
    lastname,
    birthdate,
    street,
    zipcode,
    city,
    email,
    password,
  } = req.body;
  const query = `INSERT INTO users (firstname, lastname, birthdate, street, zipcode, city, email, password) VALUES ("${firstname}", "${lastname}", "${birthdate}", "${street}", "${zipcode}", "${city}", "${email}", "${password}")`;
  try {
    const result = await executeSQL(query);
    if (result.affectedRows === 1) {
      res.json({ success: true });
    } else {
      res.json({
        success: false,
        message: "Benutzer konnte nicht registriert werden",
      });
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
        {
          userId: user.id,
          email: user.email,
          roles: [user.role],
        },
        process.env.JWT_SECRET || "secretevent",
        { expiresIn: "1h" }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: "Authentifizierung fehlgeschlagen" });
    }
  } catch (error) {
    res.status(500).json({ error: "Serverfehler beim Login" });
  }
};

module.exports = { register, login };
