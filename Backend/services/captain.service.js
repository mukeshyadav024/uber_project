const captainModel = require('../models/captain.model');

async function createCaptain({
    fullname,
    email,
    password,
    vehicle,
}){
    if (!fullname.firstname || !email || !password || !vehicle) {
        throw new Error("Please provide all required fields");
    }
    try {
        const captain = await captainModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password,
            vehicle: {
                vehicleType: vehicle.vehicleType,
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
            },
        });
        return captain;
    } catch (error) {
        throw new Error("Error creating captain");
    }
}

module.exports = {
    createCaptain
};