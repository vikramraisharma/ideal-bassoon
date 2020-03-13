const express = require('express')
const app = express()
PORT = 3003

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
})
