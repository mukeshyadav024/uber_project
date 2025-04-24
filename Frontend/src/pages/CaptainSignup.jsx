import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainContextData } from '../context/CaptainContext';
import axios from 'axios';

const CaptainSignup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [vehicleColor, setVehicleColor] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [vehicleCapacity, setVehicleCapacity] = useState("");
    const [vehiclePlateno, setVehiclePlateno] = useState("");
    
    const navigate = useNavigate()
    
    const {captain,setCaptain} =useContext( CaptainContextData)

    const submitHandler = async (e) => {
        e.preventDefault()
        const newCaptain = {
            fullname: {
          firstname: firstname,
          lastname: lastname,
            },
            email: email,
            password: password,
            vehicle: {
          color: vehicleColor,
          vehicleType: vehicleType,
          capacity: vehicleCapacity,
          plate: vehiclePlateno
            }
        }

        try{

          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,newCaptain)
        
          if(response.status===201){
              
            const data = response.data
            // console.log(data.captain);
            
             setCaptain(data.captain)
             localStorage.setItem('token',data.token)
             navigate('/captain-home')
           }
           setFirstname('')
           setLastname('')
           setEmail('')
           setPassword('')
           setVehicleColor('')
           setVehicleType('')
           setVehicleCapacity('')
           setVehiclePlateno('')
   
        
        }catch(err){
          alert(err.response.data.error)  
          // console.log(err.response.data.error);
          return
        }


       
    


    }

  return (
    <div className="p-7 pt-3 flex flex-col justify-between h-screen">
      <div >
        <img
          className="w-20 mb-2"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSVCO4w_adxK32rCXFeKq3_NbLcR9b_js14w&s"
          alt=""
        />
        <form onSubmit={(e)=>{ submitHandler(e)}} >
        <h3 className="text-xl font-medium mb-2">What's our captain's name</h3>
        <div className="flex gap-4 mb-3">
          <input
            className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
            type="text"
        value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="First name"
            required
          />
          <input
            className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
            type="text"
        value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Last name"
            required
          />
        </div>

          <h3 className="text-xl font-medium mb-2">What's our captain's email</h3>
          <input
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="email"
        value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="xyz@example.com"
            required
          />
          <h3 className="text-xl font-medium mb-2">Enter Password</h3>
          <input
            className="bg-[#eeeeee] mb-3 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
            type="password"
         value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
          <h3 className="text-xl font-medium mb-2">Vehicle Information</h3>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              placeholder="Vehicle Color"
              required
            />
            <select
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="" disabled>
               Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="number"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              placeholder="Vehicle Capacity"
              required
            />
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              value={vehiclePlateno}
              onChange={(e) => setVehiclePlateno(e.target.value)}
              placeholder="Vehicle Plate Number"
              required
            />
          </div>

          <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg ">
          Captain Signup 
          </button>
        </form>
        <p className="text-center">
          Already have an Account?
          <Link className="text-blue-600 px-1" to="/captain-login">
            Login here
          </Link>
        </p>
      </div>
      
    </div>
  )
}

export default CaptainSignup