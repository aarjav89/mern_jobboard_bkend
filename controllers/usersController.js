const {validationResult } = require('express-validator')
const User = require('../models/users') // object of Model User class

const jwt = require('jsonwebtoken'); // required in user_authentication method

const show = (req,res) => {
   return res.json({message:"testing function"})
}


const store = async (req,res) =>{

       const {first_name,last_name,email,password,role,phone,address_line,city,province,zip,summary_line, company1,
               position1,loc1,job_desc1,start_date,end_date, education1, institution1, location1, degree_awarded1, year1,
                certificate1,awarded_by1,awarded_date1, cert_expiry1,exp_salary, relocate_pref  } = req.body  //getting parameters thru object destructuring
        const err=validationResult(req)
        if(!err.isEmpty()){
                return res.status(422).json({message:err})
        }
        const status = "active";

        let user_data1 = {
            first_name:first_name,
            last_name:last_name,
            email : email,
            password : password,
            role:role,
            status:status,
            phone:phone,
            details:{
                address: {
                    address_line:address_line,
                    city:city,
                    province:province,
                    zip:zip
                },
                summary_line:summary_line,
                experience: {
                    company1:company1,
                    position1:position1,
                    start_date:start_date,
                    end_date:end_date,
                    loc1:loc1,
                    job_desc1:job_desc1
                },
                education:{
                    education1:education1,
                    institution1: institution1,
                    location1:location1,
                    degree_awarded1:degree_awarded1,
                    year1:year1
                },
                certificates:{
                    certificate1:certificate1,
                    awarded_by1:awarded_by1,
                    awarded_date1:awarded_date1,
                    cert_expiry1: cert_expiry1
                },

            },
            exp_salary:exp_salary,
            relocate_pref:relocate_pref
        }
        console.log("obj rec on server:"+user_data1);
        // var obj = JSON.parse(user_data);
        const newUser = new User(user_data1)


    try{
            await newUser.save()
        }
        catch(e){
                return res.status(500).json({message:e})
        }
        return res.json({user:newUser})
}



const authenticate = (req,res) => {
    const { email, password } = req.body;
    console.log("email & pass rec on server :"+email+" "+password);
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
                    let mysecret = "mysecretsshhh"
                    const payload = { email };
                    const token = jwt.sign(payload, mysecret, {
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