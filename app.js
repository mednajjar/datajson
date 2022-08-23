const express = require('express');
const app = express();
const Pharma = require('./routes/adminRoutes')
app.use(express.json());

// app.use("/", (req, res) => {
//     res.send('hello dady')
// })

app.use('/', Pharma)


module.exports = app;