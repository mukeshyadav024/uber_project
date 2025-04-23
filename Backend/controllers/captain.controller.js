const BlacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService= require('../services/captain.service');
const { validationResult } = require('express-validator');

async function registerCaptain(req, res){
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password,vehicle } = req.body;

    const existingCaptain = await captainModel.findOne({ email });
    if (existingCaptain) {
        return res.status(400).json({ error: "Captain already exists" });
    }

    const hashedPassword = await captainModel.hashPassword(password);
    // console.log(hashedPassword);
    

    const captain = await captainService.createCaptain({
        fullname,
        email,
        password: hashedPassword,
        vehicle,
    });
    // console.log(user);
    

    const token = captain.generateAuthToken();

    res.status(201).json({
        message: "Captain registered successfully",
        token,
        captain
    });

  
  }
    
  async function loginCaptain (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ error: "Incorrect email or password" });
    }

    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ error: "Incorrect email or password" });
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token
);
    res.status(200).json({
        message: "Captain logged in successfully",
        token,
        captain
    });
  
}

 async function getCaptainProfile(req, res) {
     res.status(200).json(req.captain);
 }

 async function logoutCaptain(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
      await BlacklistTokenModel.create({ token });
   
    res.clearCookie("token");
    
    res.status(200).json({ message: "Captain logged out successfully" });
}
      

module.exports={
    registerCaptain,
    loginCaptain,
    logoutCaptain,
    getCaptainProfile
}