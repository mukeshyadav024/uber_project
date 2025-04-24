import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import {UserContextData} from '../context/UserContext'


const UserLogin = () => {
 const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const {user,setUser}=useContext(UserContextData)
    const navigate=useNavigate()
    const submitHandler = async (e) => {
        e.preventDefault()

      const userData={
        email: email,
        password: password
    }
// console.log("heelo");
try{

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,userData)
   
  if(response.status===200){
    const data = await response.data
    // console.log(data.user);
    setUser(data.user)
    localStorage.setItem('token',data.token)
    navigate('/home')
  }
      setEmail('')
      setPassword('')
}catch(err){
  alert(err.response.data.error)  
}

   
    }

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div >
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-xl font-medium mb-2">What's your email</h3>
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
            Login
          </button>
        </form>
        <p className="text-center">
          Don't have an Account?
          <Link className="text-blue-600 px-1" to="/signup">
            Create Account
          </Link>
        </p>
      </div>
      <div>
        <Link to="/captain-login" className="bg-[#eea20b] flex items-center justify-center text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg ">
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
