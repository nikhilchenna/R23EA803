const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log("🔹 Received Auth Header:", authHeader);
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized - No Token Provided." });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized - Token format invalid." });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN || "your_secret_key", (err, user) => {
        if (err) {
            console.log("❌ Token Verification Error:", err.message);
            return res.status(403).json({ error: "Forbidden - Invalid or Expired Token." });
        }
        req.user = user;
        next();
    });
}
module.exports = authenticateToken;
