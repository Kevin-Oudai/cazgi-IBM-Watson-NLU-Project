const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}
const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/", (req, res) => {
    res.render('index.html');
});

app.get("/url/emotion", (req, res) => {
    let urlEmotion = getNLUInstance();
    const params = {
        'url': req.query.url,
        'features': {
            'emotion': {}
        }
    };
    urlEmotion.analyze(params)
        .then(analysisResults => {
            let response = analysisResults.result.emotion.document.emotion;
            return res.send(response);
        })
        .catch(err => {
            return res.send('error:', err);
        });
});

app.get("/url/sentiment", (req, res) => {
    let urlSentiment = getNLUInstance();
    const params = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    };
    urlSentiment.analyze(params)
    .then(result => {
        let response = result.result.sentiment.document.label;
        return res.send(response);
    })
    .catch(err => {
        return res.send('error: ', err);
    });
});

app.get("/text/emotion", (req, res) => {
    let textEmotion = getNLUInstance();
    const params = {
        'text': req.query.text,
        'features': {
            'emotion': {}
        }
    };
    textEmotion.analyze(params)
        .then(analysisResults => {
            let response = analysisResults.result.emotion.document.emotion;
            return res.send(response);
        })
        .catch(err => {
            return res.send('error:', err);
        });
});

app.get("/text/sentiment", (req, res) => {
    let textSentiment = getNLUInstance();
    const params = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    };
    textSentiment.analyze(params)
    .then(result => {
        let response = result.result.sentiment.document.label;
        return res.send("Text Sentiment: " + response);
    })
    .catch(err => {
        return res.send('error: ', err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})