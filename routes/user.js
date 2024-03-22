
const express =require('express');
const router = express.Router();
const { register, login, current } = require("../controller/user");
const { registerValidation, validation, loginValidation } = require('../middleware/validator');
const isAuth = require('../middleware/isAuth');
const upload = require("../utils/multer");

//register
router.post('/register',upload.single("image"),
 registerValidation(), validation,  register);
//login
router.post('/login', loginValidation(), validation, login);
//current
router.get('/current',isAuth, current)



module.exports= router;