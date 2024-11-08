const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const botToken = '7447671480:AAFtEWOh_y3k5UpIeUnV-5fJdV3L-RlqC6M';
const chatId = '906269717';

// Correct answers for grading
const correctAnswers = {
    q1: 'a',  // 'Fast' is the correct answer for question 1
    q2: 'a',  // 'Sad' is the correct answer for question 2
    q3: 'b'   // 'Recommend' is the correct answer for question 3
};

function calculateScore(answers) {
    let score = 0;
    Object.keys(correctAnswers).forEach(q => {
        if (answers[q] === correctAnswers[q]) score += 1;
    });
    return score;
}

app.post('/submit', async (req, res) => {
    const { roll, answers } = req.body;
    const score = calculateScore(answers);

    // Send to Telegram
    const message = `Roll Number: ${roll}\nScore: ${score}/3`;
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        chat_id: chatId,
        text: message
    });

    res.json({ score });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
