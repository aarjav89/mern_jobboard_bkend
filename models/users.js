const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema

const saltRounds = 10; // Required for Hashing password

const usersSchema = new Schema( {

    name : {type:String, required:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true},
    role : {type:String, required:true},
    status : { type:String },
    details : [
        {address : [
                {address_line:{type:String,required:true}},
                {city:{type:String, required: true}},
                {province:{type:String, required: true}},
                {zip:{type:String}, required:true}

            ]},
        {phone:{type:String,required:true}},
        {summary_line:{type:String}},
        {experience: [
                {company1 :{type:String}, position1: {type:String}, job_desc1: {type:String}},
                {company2 :{type:String}, position2: {type:String},job_desc2:{type:String}},
            ]},
        {education: [
                {education1:{type:String}, location1:{type:String}, year1:{type:String},degree1:{type:String} },
                {education2:{type:String}, location2:{type:String}, year2:String,degree2:{type:String} },
            ]
        },
        {certificates: [
                {certificate1:{type:String}, awarded_by1:{type:String}, awarded_date1:{type:String},certificate_expiry1:{type:String} },
                {certificate2:{type:String}, awarded_by2:{type:String}, awarded_date2:{type:String},certificate_expiry2:{type:String} },
            ]
        }],
        salary : {type:String},
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