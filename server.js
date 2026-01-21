const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const gradeTable = [
    { min: 90, max: 100, grade: "A" },
    { min: 75, max: 89, grade: "B" },
    { min: 50, max: 74, grade: "C" },
    { min: 0, max: 49, grade: "D" }
];

const personalityTable = {
    "A": "Excellent",
    "B": "Good",
    "C": "Average",
    "D": "Weak"
};

app.post("/personality", (req, res) => {
    const { name, marks } = req.body;

    if (!name || !marks || marks.length !== 3) {
        return res.status(400).json({ error: "Please provide name and 3 subject marks" });
    }

    const sum = marks.reduce((a, b) => a + b, 0);
    const average = sum / 3;

    let grade = "";
    for (let i = 0; i < gradeTable.length; i++) {
        if (average >= gradeTable[i].min && average <= gradeTable[i].max) {
            grade = gradeTable[i].grade;
            break;
        }
    }

    const personality = personalityTable[grade];

    res.json({
        name,
        average: parseFloat(average.toFixed(2)),
        grade,
        personality
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
