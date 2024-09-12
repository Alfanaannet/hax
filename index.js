const express = require('express');
const app = express();
const port = 3000;
app.get('/callback', async (req, res) => {
    const code = req.query.code;
    const state = req.query.state;
    console.log(state,code);
    if (!code || !state) {
        return res.status(400).send('Error: Missing code or state parameter');
    }

    try {
        res.redirect(`${state}?code=${code}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the authentication request');
    }
});

app.get('/ping', async (req, res) => {
    res.status(200).send('Pong');
});
app.listen(port, () => {
    console.log(`Server is running on`);
});
