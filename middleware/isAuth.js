const jwt = require("jsonwebtoken")
const User = require("../models/User")


const isAuth =async (req, res, next)=>{
    try {
        const token= req.headers['authorization']
        if(!token){
            return res.status(401).send({errors:[{msg:'You are not authorized!!!'}]})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        const foundUser = await User.findOne({_id:decoded.id})
        if(!foundUser){
            return res.status(401).send({errors:[{msg:'You are not authorized!!!'}]})
        }
        req.body= foundUser;
        next()
    } catch (error) {
        res.status(401).send({errors:[{msg:'You are not authorized!!!'}]})
    }
}

module.exports = isAuth