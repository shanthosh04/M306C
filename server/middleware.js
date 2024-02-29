const jwt = require("jsonwebtoken");

const authenticateToken = (...roles) => (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.json({ status: 401 });
  jwt.verify(token, process.env.JWT_SECRET || "secretevent", (err, user) => {
    if (err) return res.json({ status: 401 });

    const hasRole = roles.reduce((result, role) => {
      if (user.roles.includes(role)) return true;
      return result;
    }, !roles.length);

    if (!hasRole) return res.json({ status: 403 });

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
