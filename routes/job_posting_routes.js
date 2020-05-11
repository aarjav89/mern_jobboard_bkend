const express= require('express')
const router = express.Router()

const jobsController = require('../controllers/jobsController')



router.get('/',jobsController.index)
router.post('/register',jobsController.store)
router.patch('/update/:jobID',jobsController.update)
router.delete('/delete/:jobID',jobsController.deleteJob)


module.exports = router