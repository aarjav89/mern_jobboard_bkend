const express= require('express')
const router = express.Router()

const usersController = require('../controllers/usersController')

router.get('/show/:user_id',usersController.show)
router.post('/register',usersController.store)

module.exports = router