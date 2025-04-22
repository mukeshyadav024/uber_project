const userModel = require('../models/user.model');

async function createUser({
    fullname,
    email,
    password
}){
    if (!fullname.firstname || !email || !password) {
        throw new Error("Please provide all required fields");
    }
    try {
        const user = await userModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password,
        });
        return user;
    } catch (error) {
        throw new Error("Error creating user");
    }
}

module.exports = {
    createUser
};