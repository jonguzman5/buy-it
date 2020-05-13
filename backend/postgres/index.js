const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const db = require('./queries')
const port = 3003

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getBudget);
app.get('/users', db.getCategory);

app.post('/users', db.setBudget);
app.put('/users/:id', db.setCategory);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

