const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobPostingSchema = new Schema ({

        job_title : {type: String, required:true},
        location : {type: String, required:true},
        province:{type:String, required:true},
        job_desc: {type:String},
        salary_range:{type:String},
        comp_name :{type:String, required:true},
        about_comp : {type: String},
        website:{type:String},
        responsibilities : {
            resp1: {type: String, required: true},
            resp2: {type: String},
            resp3: {type: String},
            resp4: {type: String},
            resp5: {type: String}
        },
        qualifications : {type:String},
        skills : {type:String},
        benefits : {
            benefit1: {type: String},
            benefit2: {type: String},
            benefit3: {type: String}
         },
        isFilled : {type:Boolean, required:true},
        hashTags : {
            hashTag1: {type: String},
            hashTag2: {type: String},
            hashTag3: {type: String},
            hashTag4: {type: String},
            hashTag5: {type: String}
        },
        created_by : {type:String, required:true},
        //created_by : {type:mongoose.Types.ObjectId, required:true, ref:'User'},
        created_at : {type:String, required:true},
        modified_at : {type:String, required:true}

})

module.exports = mongoose.model("Job_Posting",jobPostingSchema)