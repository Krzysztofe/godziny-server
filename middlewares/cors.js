const cors = (req, res, next) => {
  const allowedOrigin = "https://krzysztofe.github.io";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};

module.exports = cors;
