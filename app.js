const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./routes/user_routes')
//const jpRoutes = require('./routes/job_posting_routes')

const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const withAuth = require('./middleware');

// Always Remember to use Body Parser above the routes declaration.
app.use(bodyParser.json())

// Routes
app.use('/api/users',userRoutes)
//app.use('/api/jobpost',jpRoutes)

//secret token issued on successful authentication
const secret = 'mysecretsshhh';

app.get('/api/secret', withAuth, function(req, res) {
    res.send('The password is potato');
});

app.get('/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

//To ignore CORS errors
app.use((req,res,next)=>{

    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, Content-Type , Accept')

    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE')


    next();

})


// Connecting to the MongoDB Database
mongoose.connect("mongodb+srv://aarjav:test-pass@cluster0-n3b2h.mongodb.net/job_board?retryWrites=true&w=majority",{useNewUrlParser:true, useUnifiedTopology:true})
    .then( () => {
        app.listen(5000)
        console.log("connected");
    }).catch( () => {
        console.log("Unable to connect to mongoDB")
})