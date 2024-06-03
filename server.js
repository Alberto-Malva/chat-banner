const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');
const cors = require('cors');
const app = express();
const port = 3000;

const keywordBanners = {
    "DIABETE": '[adrotate banner="3"]',
    "GLICATA": '[adrotate banner="3"]',
    "EMOGLOBINA GLICATA": '[adrotate banner="3"]',
    "INSULINA": '[adrotate banner="4"]',
    "GLIFOZINE": '[adrotate banner="3"]'
};

app.use(cors());
app.use(bodyParser.json());

app.post('/getBanner', (req, res) => {
    const { question } = req.body;
    console.log('Ricevuta domanda:', question);

    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(question.toUpperCase());
    console.log('Tokenized question:', tokens);

    let foundBanner = '';

    for (let token of tokens) {
        if (keywordBanners[token]) {
            foundBanner = keywordBanners[token];
            break;
        }
    }

    console.log('Banner trovato:', foundBanner);

    res.json({
        bannerContent: foundBanner
    });
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
