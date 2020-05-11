const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const saltRounds = 10; // Required for Hashing password

const usersSchema = new Schema( {

    first_name : {type:String, required:true},
    last_name : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    role : {type:String, required:true},
    status : { type:String },
    phone:{type:String,required:true},
    details : {
        address :
                {
                    address_line:{type :String,required:true},
                    city:{type:String, required: true},
                    province:{type:String, required: true},
                    zip:{type:String, required:true}

            },
         summary_line:{type:String},
         experience: {
                 company1 :{type:String},
                 position1: {type:String},
                 start_date1:{type:String},
                 end_date1:{type:String},
                 loc1:{type:String},
                 job_desc1: {type:String},

                 company2 :{type:String},
                 position2: {type:String},
                 start_date2:{type:String},
                 end_date2:{type:String},
                 loc2:{type:String},
                 job_desc2:{type:String},
             },

         education: {
                 education1:{type:String},
                 institution1: {type:String},
                 location1:{type:String},
                 degree_awarded1:{type:String},
                  year1:{type:String},

                  education2:{type:String},
                  institution2:{type:String},
                  location2:{type:String},
                  year2:String,

            },

        certificates: {
            certificate1: {type: String},
            awarded_by1: {type: String},
            awarded_date1: {type:String},
            cert_expiry1: {type: String},

            certificate2: {type: String},
            awarded_by2: {type: String},
            awarded_date2: {type: String},
            cert_expiry2: {type: String},
           }
        },
        exp_salary : {type:String},
        relocate_pref : {type:String}

        } )


            usersSchema.pre('save', function(next) {
                // Check if document is new or a new password has been set
                if (this.isNew || this.isModified('password')) {
                    // Saving reference to this because of changing scopes
                    const document = this;
                    bcrypt.hash(document.password, saltRounds,
                        function(err, hashedPassword) {
                            if (err) {
                                next(err);
                            }
                            else {
                                document.password = hashedPassword;
                                next();
                            }
                        });
                } else {
                    next();
                }
            });


        //called when authentication request is sent from client
        usersSchema.methods.isCorrectPassword = function(password, callback){
            bcrypt.compare(password, this.password, function(err, same) {
                if (err) {
                    callback(err);
                } else {
                    callback(err, same);
                }
            });
        }


module.exports = mongoose.model("Users",usersSchema)