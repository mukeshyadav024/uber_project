import React, {  useContext, useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserContextData} from '../context/UserContext'

const UserSignup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate()

const {user,setUser}=useContext(UserContextData)

    const submitHandler = async (e) => {
        e.preventDefault()
      const newuser={
        fullname: {
            firstname: firstname,
            lastname: lastname,
        },
        email: email,
        password: password
    }
try{

  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newuser)

  if(response.status===201){
      
    const data = response.data
    // console.log(data.user);
    
     setUser(data.user)
     localStorage.setItem('token',data.token)
     navigate('/home')
   }
         setFirstname('')
         setLastname('')
         setEmail('')
         setPassword('')

}catch(err){
  alert(err.response.data.error)  
  // console.log(err.response.data.error);
  return
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
        <form onSubmit={(e)=>{ submitHandler(e)}} >
        <h3 className="text-xl font-medium mb-2">What's your name</h3>
        <div className="flex gap-4 mb-5">
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
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an Account?
          <Link className="text-blue-600 px-1" to="/login">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className='text-[11px] '> By creating , you agree to follow our guidelines, pay applicable fares, and use the service responsibly. We are not liable for damages or misuse—please ride safely and respectfully.</p>
      </div>
    </div>
  )
}

export default UserSignup