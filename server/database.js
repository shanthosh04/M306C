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

const executeSQL = async (query, params) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const res = await conn.query(query, params);
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
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );`;
  await executeSQL(userTableQuery);

  const companyTableQuery = `CREATE TABLE IF NOT EXISTS companys (
    id INT NOT NULL AUTO_INCREMENT,
    companyName VARCHAR(255) NOT NULL,
    companyCity VARCHAR(255) NOT NULL,
    companyStreet VARCHAR(255) NOT NULL,
    companyDescription VARCHAR(1024) NOT NULL,
    contactPerson VARCHAR(255) NOT NULL,
    companyEmail VARCHAR(255) NOT NULL,
    companyPhone VARCHAR(255) NOT NULL,
    companyField VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
  );`;
  await executeSQL(companyTableQuery);

  const entriesTableQuery = `CREATE TABLE IF NOT EXISTS entries (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    imageApplicant longblob NOT NULL,
    address VARCHAR(255) NOT NULL,
    cityAndZip VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    field VARCHAR(255) NOT NULL,
    classname VARCHAR(255) NOT NULL,
    qvYear INT NOT NULL, 
    certificate longblob NOT NULL,
    noteQV longblob NOT NULL,
    internshipContract longblob,
    efzCopy longblob NOT NULL,
    legalGuardian VARCHAR(255),
    applicationDate DATE NOT NULL,
    internshipCompany VARCHAR(255) NOT NULL,
    responsiblePerson VARCHAR(255) NOT NULL,
    applicationStatus VARCHAR(255) NOT NULL,
    interviewDate DATE NOT NULL,
    trialVisitDate DATE NOT NULL,
    contractCreationDate DATE,
    internshipSalary1 INT NOT NULL,
    internshipSalary2 INT NOT NULL,
    mbaApprovalDate DATE,
    birthDate DATE NOT NULL,
    ahvNumber VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
  );`;
  await executeSQL(entriesTableQuery);
};

module.exports = { executeSQL, initializeMariaDB, initializeDBSchema };