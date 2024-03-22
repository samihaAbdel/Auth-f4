const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require('bcrypt');
const cloudinary = require("../utils/cloudinary");

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, image } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).send({ msg: "email should be unique!!!" });
    } else {
      const saltRounds = 10;
      const hachPassword = await bcrypt.hash(password, saltRounds)
      // const newUser = new User({ ...req.body });
      const result = await cloudinary.uploader.upload(req.file.path);
    // Create new user
    let newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      image: result.secure_url,
      cloudinary_id: result.public_id,
    });
      newUser.password =hachPassword
      await newUser.save();
      const token = jwt.sign(
        {id:newUser._id},
        SECRET_KEY = process.env.SECRET_KEY,
        {expiresIn:'1h'}
      )
      res.status(200).send({ msg: "register successfully!!!", user:newUser, token });
    }
  } catch (error) {
    res.status(400).send({msg:'cant register'})
  }
};


module.exports.login = async(req, res) => {
 try {
     const {email, password}= req.body
     const foundUser = await User.findOne({ email });
     if(!foundUser){
         return res.status(400).send({error:[{msg:'Bad credential'}]})
     }
     else{
       const result= await bcrypt.compare(password, foundUser.password)
       if(result){
        const token = jwt.sign(
          {id:foundUser._id},
          SECRET_KEY = process.env.SECRET_KEY,
          {expiresIn:'1h'}
        )
       res.status(200).send({msg:'login succesffully', user:foundUser, token})
     }
     else {
         return res.status(400).send({error:[{msg:'Bad credential'}]})
     }
    
     }} catch (error) {
        res.status(400).send({msg:'cant login'})
 }


};

module.exports.current=(req, res)=>{
   res.send(req.body)}