const express = require("express");
const authenticateToken = require("./middleware");

const router = express.Router();
router.post("/calculate-average", (req, res) => {
    const { numbers } = req.body;
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return res.status(400).json({ error: "Invalid input. Please provide a non-empty array of numbers." });
    }
    if (!numbers.every(num => typeof num === "number")) {
        return res.status(400).json({ error: "Array must contain only numbers." });
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    res.json({ average });
});
router.get("/protected-data", authenticateToken, (req, res) => {
    res.json({ message: "Access granted!", user: req.user });
});

module.exports = router;
