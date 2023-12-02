const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

app.use(cors());
// ... deine anderen Routen hier ...


app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// In-memory storage for simplicity; replace with a database in a real application
let savedData = [];

app.get('/api/ranking', (req, res) => {
    // Sort the saved data by score in descending order
    const sortedData = savedData.sort((a, b) => b.score - a.score);

    // Send the sorted data as the response
    res.json(sortedData);
});

app.post('/api/save', (req, res) => {
    const { name, score } = req.body;

    // Check if the name has at least 3 characters and the score is within the valid range [0, 150]
    if (name.length >= 3 && score >= 0 && score <= 150) {
        // Add the new entry to the saved data
        savedData.push({
            name,
            score,
            timestamp: new Date().getTime()
        });

        // Send a success response
        res.json({ success: true });
    } else {
        // Send an error response
        res.status(400).json({ success: false, message: 'Invalid data' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




