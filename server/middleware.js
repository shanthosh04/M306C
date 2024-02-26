
const jwt = require("jsonwebtoken");

const authenticateToken = (...roles) => (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET || "secretevent", (err, user) => {
    if (err) return res.sendStatus(401);

    const hasRole = roles.reduce((result, role) => {
      if (user.roles.includes(role)) return true;
      return result;
    }, !roles.length);

    if (!hasRole) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
