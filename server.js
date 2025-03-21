const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 3000;
app.use(express.json());
const SECRET_KEY = process.env.ACCESS_TOKEN || "your_secret_key";
app.post("/login", (req, res) => {
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: "Username is required." });
    }
    const user = { name: username };
    const accessToken = jwt.sign(user, SECRET_KEY, { expiresIn: "1h" });
    res.json({ access_token: accessToken });
});
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized - Token missing." });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Forbidden - Invalid or expired token." });
        }
        req.user = user;
        next();
    });
};
app.get("/api/protected-data", authenticateToken, (req, res) => {
    res.json({ message: "Access granted!", user: req.user });
});
app.listen(port, () => {
    console.log(`✅ Server is running at http://localhost:${port}`);
});
