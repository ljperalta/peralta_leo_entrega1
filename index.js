const app = require('./app')

const port = 8080

app.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
})