const jwt = require("jsonwebtoken");
const { executeSQL } = require("./database");
const ldap = require('ldapjs');


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
 
  // LDAP-Server-Konfiguration
  const ldapOptions = {
    url: 'ldap://172.16.1.10:389',
  };
  const client = ldap.createClient(ldapOptions);
 
  // LDAP-Bind-Operation durchführen
  client.bind(email, password, (err) => {
    if (err) {
      console.error('LDAP bind failed:', err);
      res.status(401).json({ error: 'Authentifizierung fehlgeschlagen' });
    } else {
      console.log('LDAP bind successful');
 
      // Benutzerinformationen abrufen, einschließlich der Rolle
      client.search('ou=webinterface_users,dc=modul,dc=local', { filter: `(email=${email})`, scope: 'sub' }, (searchErr, searchRes) => {
        if (searchErr) {
          console.error('LDAP search failed:', searchErr);
          res.status(500).json({ error: 'Serverfehler beim Abrufen von Benutzerinformationen' });
          return;
        }
        console.log("1")
        let userRole;
 
        searchRes.on('searchEntry', (entry) => {
          // Hier die Rolle des Benutzers aus dem LDAP-Eintrag extrahieren
          userRole = entry.object.role; // Hier 'role' durch das entsprechende LDAP-Attribut für die Rolle ersetzen
          console.log(userRole)
          console.log("userRole")
        });
 
        searchRes.on('end', () => {
          // Hier können Sie ein JWT-Token generieren und die Benutzerrolle darin speichern
          const token = generateToken(email, userRole); // Funktion zum Generieren eines Tokens
          res.json({ token });
        });
      });
    }
    client.unbind();
  });
};
 
// JWT-Token generieren
const generateToken = (email, role) => {
  // Hier können Sie ein JWT-Token generieren
  // Beispiel: Verwendung von jsonwebtoken
  const token = jwt.sign(
    { email, role },
    process.env.JWT_SECRET || 'secretevent',
    { expiresIn: '1h' }
  );
  return token;
};

module.exports = { register, login };
