const express= require('express')
const router = express.Router()

const jobsController = require('../controllers/jobsController')



router.get('/',jobsController.index)
router.get('/:job_id',jobsController.show)
router.post('/register',jobsController.store)
router.patch('/update/:jobID',jobsController.update)
router.delete('/delete/:job_id',jobsController.deleteJob)


module.exports = router