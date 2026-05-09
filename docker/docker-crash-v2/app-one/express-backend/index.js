const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Welcome World After Struggle!')
})

app.get('/data', (req, res) => {
    res.send('Data from node-app-one');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})