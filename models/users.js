const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema( {

    name : {type:String, required:true},
    email : {type:String, required:true},
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

module.exports = mongoose.model("User",usersSchema)