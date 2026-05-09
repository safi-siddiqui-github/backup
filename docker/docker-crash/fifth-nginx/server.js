const express = require('express');
const path = require('path');
const dotenv = require("dotenv");
const app = express();
const port = 3000;
dotenv.config();

const url = process.env.LOCAL_URL;
const appName = process.env.APP_NAME;

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    console.log(`Home Page by ${appName}`);
})

app.listen(port, () => {
    console.log(`${appName} running on: ${url}:${port}`);
})
