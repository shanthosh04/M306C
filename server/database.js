let pool = null;

const initializeMariaDB = () => {
  const mariadb = require("mariadb");
  pool = mariadb.createPool({
    database: process.env.DB_NAME || "mychat",
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "mychat",
    password: process.env.DB_PASSWORD || "mychatpassword",
    connectionLimit: 5,
  });
};

const executeSQL = async (query) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query);
    return res;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

const initializeDBSchema = async () => {
  const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    birthdate DATE NOT NULL,
    street VARCHAR(255) NOT NULL,
    zipcode VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );`;

  const companyTableQuery = `CREATE TABLE IF NOT EXISTS companys (
    id INT NOT NULL AUTO_INCREMENT,
    companyName VARCHAR(255) NOT NULL,
    companyCity VARCHAR(255) NOT NULL,
    companyStreet VARCHAR(255) NOT NULL,
    companyDescription VARCHAR(255) NOT NULL,
    contactPerson VARCHAR(255) NOT NULL,
    companyEmail VARCHAR(255) NOT NULL,
    companyPhone VARCHAR(255) NOT NULL,
    companyField VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );`;
  await executeSQL(companyTableQuery, userTableQuery);
};

module.exports = { executeSQL, initializeMariaDB, initializeDBSchema };
