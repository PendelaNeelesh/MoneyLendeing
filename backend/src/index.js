const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
require('dotenv/config');


const app = express();
//Middleware
app.use(cookieParser())
app.use(express.json())
app.use(cors())
//Routes
const user = require('./Routes/user')
app.use('/user', user)
app.use(express.static(path.join(__dirname, "build")))
const transac = require('./Routes/transac')
app.use('/transac', transac)

const requestRoutes = require('./Routes/Requests')
app.use('/request', requestRoutes)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
//DataBase Configuration
const dbURI = "mongodb+srv://library_admin:iA5U7ChUlx3ygfh5@cluster0.jdi5t.mongodb.net/finance?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true })
    .then((result) => {
        app.listen(8000, () => {
            console.log("Listening on http://localhost:8000")
        })
    })
    .catch((err) => console.error(err));


module.exports = app;