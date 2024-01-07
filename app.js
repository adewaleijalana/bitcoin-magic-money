const express = require('express')
const bodyParser = require('body-parser')
const bitcoinMethods = require('./routes/api')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", bitcoinMethods);

const port = process.env.PORT || 5522;

server = app.listen(port, () => console.log(`Server running on port ${port}`));