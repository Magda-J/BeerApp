const express = require('express')
const app = express()
const port = 3002
const router = require("./routes/beerRoutes")


// added for database
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING, {
    
}).then(() => console.log('MongoDB connected...'))
.catch((err) => console.log(err))

// added for database




app.use(express.json());

app.use(router)

app.get('/', function (req, res) {
  res.send('Hello World from the server')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

