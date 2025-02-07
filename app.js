const express = require('express')
const { route } = require('./server/routes/route.products')
const app = express()
//const logger = require("morgan")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
//app.logger("dev")

// app.use((res,req,next) => {   //colocar acceso de quien puede acceder y desde donde a la api
//   res.header("Access")
// })

const routes = require("./server/routes/index");
app.use("/", routes);

// app.get('/', (req, res) => {
//   res.send(route)
// })

module.exports = app