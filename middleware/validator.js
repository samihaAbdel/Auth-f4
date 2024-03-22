const { check, validationResult } = require("express-validator");


module.exports.registerValidation= ()=>[
    check("name","Name is required!!!").not().isEmpty(),
    check("email","Give a valid email").isEmail(),
    check("password","password should be 8car min").isLength({min:8})
]
module.exports.loginValidation= ()=>[
    check("email","Give a valid email").isEmail(),
    check("password","password should be 8car min").isLength({min:8})
]

module.exports.validation =(req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    next();
};
