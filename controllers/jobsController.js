const {validationResult } = require('express-validator')

const Job = require('../models/job_posting') // object of Model User class



const index = async (req,res) => {
    let jobs;
    try{
        jobs = await Job.find()

    }catch (e) {
        return  res.status(417).json({message:e})
    }

    res.status(200).json({jobs})
}

const store= async (req,res) => {

    const { job_title,location,province,job_desc,salary_range,comp_name,comp_desc,website,
        responsibilities,qualifications,benefits } = req.body  //getting parameters thru object destructuring
    const err=validationResult(req)
    if(!err.isEmpty()){
        return res.status(422).json({message:err})
    }


    let job_data = {
        job_title:job_title,
        location:location,
        province : province,
        job_desc : job_desc,
        salary_range:salary_range,
        comp_name:comp_name,
        about_comp:comp_desc,
        website:website,
        responsibilities:{
            resp1 : responsibilities
        },
        qualifications:qualifications,
        benefits:{
            benefit1: benefits
        },
        isFilled: true,
        created_by: "Aarjav",
        created_at: "2020-05-11 18:30:05",
        modified_at: "2020-05-11 18:30:05",


    }
    console.log("obj rec on server:"+job_data);
    // var obj = JSON.parse(user_data);
    const newJob = new Job(job_data)


    try{
        await newJob.save()
    }
    catch(e){
        return res.status(500).json({message:e})
    }
    return res.json({job:newJob})


} // end show function




const update = (req,res) => {

}

const deleteJob = (req,res) => {

}

exports.index = index
exports.store = store
exports.update = update
exports.deleteJob = deleteJob