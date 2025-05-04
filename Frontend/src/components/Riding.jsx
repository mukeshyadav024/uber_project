import React from 'react'
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Riding = () => {
  const location = useLocation();
  const ride = location.state.ride;
  // console.log(ride);
  
  return (
   <div className='h-screen'>
    <Link to='/home' className='fixed right-2 top-2 rounded-full flex h-10 w-10 bg-white items-center justify-center'>
        <i className="text-lg font-medium ri-home-5-line"></i>
    </Link>

     <div className='h-1/2'>
         <img
          className="h-full w-full object-cover"
          src="https://www.researchgate.net/publication/323759986/figure/fig3/AS:631576123682823@1527590890164/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
          alt=""
        />
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