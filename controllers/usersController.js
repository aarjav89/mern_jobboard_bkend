const express = require('express')
const User = require('../models/users') // object of Model User class

const show = (req,res) => {
   res.json({message:"testing function"})
}


const store = (req,res) =>{
        return res.json({message:"testing function"})
}

exports.store = store()
exports.show = show()