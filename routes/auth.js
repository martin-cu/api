const router = require('express').Router();
const db_controller = require('../controllers/db_controller');

const { isPublic, isPrivate, isAdmin } = require('../middlewares/checkAuth');
const { registerValidation, loginValidation, myPasswordValidate } = require('../validators.js');

router.get('/', db_controller.query_table);

router.get('/import/:data', db_controller.import, db_controller.query_table);


module.exports = router;
