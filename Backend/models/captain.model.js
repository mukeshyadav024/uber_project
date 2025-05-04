const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema= new mongoose.Schema({
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
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketID:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:"inactive"
    },
    vehicle:{
        vehicleType:{
            type:String,
            enum:['car','auto','motorcycle'],
            required:true,
        },
        color:{
            type:String,
            required:true,
        },
        plate:{
            type:String,
            required:true,
        },
        capacity:{
            type:Number,
            required:true,
            default:1,
        },
       
    },
    location:{
        lng:{
            type:Number,
        },
        ltd:{
            type:Number,
        },
    }
})


captainSchema.methods.generateAuthToken = function () {
    const captain = this;
    const token = jwt.sign({ _id: captain._id}, process.env.JWT_SECRET);
    return token;
}

captainSchema.statics.hashPassword = async function (password) {
    // console.log("called hash password ");
    
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
}

captainSchema.methods.comparePassword = async function (password) {
    const captain = this;
    const isMatch = await bcrypt.compare(password, captain.password);
    return isMatch;
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;