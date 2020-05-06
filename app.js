const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user_routes')
const jpRoutes = require('./routes/job_posting_routes')

const app = express();

app.use('/api/users',userRoutes)
app.use('/api/jobpost',jpRoutes)


// Routes

app.use(bodyParser.json())



mongoose.connect("mongodb+srv://aarjav:test-pass@cluster0-n3b2h.mongodb.net/job_board?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true})
    .then( () => {
        app.listen(5000)
        console.log("connected");
    }).catch( () => {
        console.log("Unable to connect to mongoDB")
})