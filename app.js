const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const routes = require("./server/routes/index");
app.use("/", routes);

module.exports = app