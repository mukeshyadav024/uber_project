import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CaptainContextData } from '../context/CaptainContext';
import axios from 'axios';

const CaptainLogin = () => {

 const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 

    const {captain,setCaptain}=useContext(CaptainContextData)
    const navigate=useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()

        // console.log(email, password);
        const captainData={
          email: email,
          password: password
      }

        try{

          const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`,captainData)
          //  console.log(response.status);
           
          if(response.status===200){
            const data = response.data
            // console.log(data.captain);
            
            setCaptain(data.captain)
            localStorage.setItem('token',data.token)
            navigate('/captain-home')
          }
              setEmail('')
              setPassword('')
        }catch(err){
          alert(err.response.data.error) 
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
      <form onSubmit={(e) => submitHandler(e)}>
        <h3 className="text-xl font-medium mb-2">What's our captain's email</h3>
        <input
          className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="xyz@example.com"
          required
        />
        <h3 className="text-xl font-medium mb-2">Enter Password</h3>
        <input
          className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          required
        />
        <button className="bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg ">
        Captain Login
        </button>
      </form>
      <p className="text-center">
        join a fleet?    
        <Link className="text-blue-600 px-1" to="/captain-signup">
         Register as a Captain 
        </Link>
      </p>
    </div>
    <div>
      <Link to="/login" className="bg-[#eea20b] flex items-center justify-center text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg ">
        Sign in as User
      </Link>
    </div>
  </div>
  )
}

export default CaptainLogin