import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captainData, setCaptainData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault()
        setCaptainData({
            fullname: {
                firstname: firstname,
                lastname: lastname,
            },
            email: email,
            password: password
        })
        // console.log(captainData);
        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')

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
      <div>
        <p className='text-[11px] '> By creating , you agree to follow our guidelines, pay applicable fares, and use the service responsibly. We are not liable for damages or misuse—please ride safely and respectfully.</p>
      </div>
    </div>
  )
}

export default CaptainSignup