import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { SocketContext } from '../context/SocketContext';
import LiveTracking from './LiveTracking';


const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  // console.log(ride);
  const {socket}=useContext(SocketContext)
  const navigate = useNavigate()

  socket.on('ride-ended',()=>{
    navigate('/home')
  })


  

  return (
   <div className='h-screen'>
    <Link to='/home' className='fixed z-10  right-2 top-14 rounded-full flex h-10 w-10 bg-white items-center justify-center'>
        <i className="text-lg font-medium ri-home-5-line"></i>
    </Link>

     <div className='h-1/2'>
     <LiveTracking />
    </div>
    <div className='h-1/2 p-4'>
    <div className='flex items-center justify-between'>
    
    
    <img className='h-14 rounded-full object-cover' src="https://tse4.mm.bing.net/th?id=OIP.iattzUh9ORYsWdrgKMmAWAHaHU&pid=Api&P=0&h=180" alt="" />
    <div className='text-right'>
        <h2 className='text-lg font-medium capitalize'>{ride?.captain.fullname.firstname}</h2>
        <h4 className='text-xl -mt-1 font-semibold'>{ride?.captain.vehicle.plate}</h4>
        <p className='text-sm -mt-1 text-gray-600'>Marui Suzuki Alto </p>
    </div>
</div>


      <div className="flex gap-2 justify-between flex-col items-center">
       
        <div className="w-full mt-5 ">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-gray-600 text-sm -mt-1">{ride?.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 ">
            <i className="text-lg ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
              <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
      <button onClick={()=>{
            props.setLookingForDriverPanelOpen(true)
            props.setConfirmRidePanelOpen(false);
        }} className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make A Payment 
        </button>
    </div>
   </div>
  )
}

export default Riding