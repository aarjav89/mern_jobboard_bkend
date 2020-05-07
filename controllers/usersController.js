const {validationResult } = require('express-validator')
const User = require('../models/users') // object of Model User class

const jwt = require('jsonwebtoken'); // required in user_authentication method

const show = (req,res) => {
   return res.json({message:"testing function"})
}


const store = async (req,res) =>{

       const {name,email,password,role,phone,salary,address } = req.body  //getting parameters thru object destructuring
        const err=validationResult(req)
        if(!err.isEmpty()){
                return res.status(422).json({message:err})
        }
        const status = "active"

        const newUser = new User({
                name,
                email,
                password,
                role,
                status,
                phone,
                salary
        })
        try{
                user = await newUser.save()
        }
        catch(e){
                return res.status(500).json({message:e})
        }
        return res.json({user:newUser})
}


const authenticate = (req,res) => {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true })
                        .sendStatus(200);
                }
            });
        }
    });
}

const secret = (req,res) => {
    res.send('The password is potato');
}

exports.store = store
exports.show = show
exports.authenticate = authenticate
exports.secret = secret