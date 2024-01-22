const express = require('express')
const app = express()
const port = 3000
const router = require("./routes/beerRoutes")

app.use(express.json());

app.use(router)

app.get('/', function (req, res) {
  res.send('Hello World from the server')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

