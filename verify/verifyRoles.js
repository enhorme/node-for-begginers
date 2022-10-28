const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.roles) return res.sendStatus(401);

    const roleArr = [...allowedRoles];
    const result = req.roles
      .map((role) => roleArr.includes(role))
      .find((i) => i === true);

    if (!result) return res.sendStatus(401);
    next();
  };
};

module.exports = verifyRoles;
