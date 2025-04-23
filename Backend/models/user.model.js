const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:false
        }

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketID:{
        type:String,
    }
})


userSchema.methods.generateAuthToken = function () {
    const user = this;
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET,{
        expiresIn: '24h' // Token will expire after 24 hour
    });
    return token;
}

userSchema.statics.hashPassword = async function (password) {
    // console.log("called hash password ");
    
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

userSchema.methods.comparePassword = async function (password) {
    const user = this;
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;