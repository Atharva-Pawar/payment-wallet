const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(411).json({
      msg: "invalid authorization header",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (verified.userID) {
      req.userID = verified.userID;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch {
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
