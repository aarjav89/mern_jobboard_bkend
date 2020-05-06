const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobPostingSchema = new Schema ({

        position : {type: String, required:true},
        location : {type: String, required:true},
        salary_range : {type: String},
        description: {type:String},
        about_comp : {type: String},
        responsibilities : {type:String, required:true},
        benefits : [
            {benefit1 : {type:String, required:true}},
            {benefit2 : {type:String}},
            {benefit2 : {type:String}},
        ],
        qualifications : {type:String},
        skills : {type:String},
        isFilled : {type:Boolean, required:true},
        hashTags : [
            {hashTag1:{type:String, required:true}},
            {hashTag2:{type:String}},
            {hashTag3:{type:String}},
            {hashTag4:{type:String}},
            {hashTag5:{type:String}}
        ],
        created_by : [{type:mongoose.Types.ObjectId, required:true, ref:'User'}],
        created_at : {type:String, required:true},
        modified_at : {type:String, required:true}

})

module.exports = mongoose.model("Job_Posting",jobPostingSchema)