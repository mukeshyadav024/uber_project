import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"

const ConfirmRidePopup = (props) => {

    const [otp, setOtp] = useState("")
    const navigate = useNavigate()

    const submitHandler=async(e)=>{
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/ride/start-ride`,{
            params:{rideId:props.ride._id,
              otp:otp},
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
          }
          )

            if(response.status===200){
              props.setConfirmRidePopupPanelOpen(false),
              props.setRidePopupPanelOpen(false)
                navigate('/captain-riding', { state: { ride: props.ride } })
            }
            
    }

  return (
    <div>
    <h5
      onClick={() => {
        props.setConfirmRidePopupPanelOpen(false);
      }}
      className="p-1 text-center absolute top-0 w-[93%] "
    >
      {" "}
      <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
    </h5>

    <h3 className="text-2xl font-semibold mb-5 ">Confirm this ride to Start </h3>
      <div className='flex items-center justify-between mt-4 p-3 bg-yellow-400 rounded-lg '>
        <div className='flex items-center gap-3'>
        <img className='h-12 rounded-full object-cover' src="http://img.izismile.com/img/img3/20100428/640/she_makes_random_640_01.jpg" alt="" />
        <h2 className='text-lg font-medium capitalize'>{props.ride?.user.fullname.firstname +" "+props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

    <div className="flex gap-2 justify-between flex-col items-center">

      <div className="w-full mt-5 ">
        <div className="flex items-center gap-5 p-3 border-b-2 ">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-gray-600 text-sm -mt-1">{props.ride?.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-gray-600 text-sm -mt-1">{props.ride?.destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 ">
          <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
            <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
          </div>
        </div>
      </div>

      <div className='mt-6 w-full'>
        <form onSubmit={submitHandler}>
            <input value={otp} onChange={(e)=>{setOtp(e.target.value)}} type="text"className="bg-[#eeeeee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-4 mb-3 " placeholder='Enter OTP' />
        <button 
       
        className=" w-full text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
        Confirm
      </button>
      <button  onClick={() => {
        props.setConfirmRidePopupPanelOpen(false);
        props.setRidePopupPanelOpen(false);
      }}  className="w-full mt-2 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg">
        Cancel
      </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ConfirmRidePopup