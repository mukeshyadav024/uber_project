import React from 'react'
import { Link } from 'react-router-dom';

const FinishRide = (props) => {
    
  return (
   
    <div>
    <h5
      onClick={() => {
        props.setFinishRidePanelOpen(false);
      }}
      className="p-1 text-center absolute top-0 w-[93%] "
    >
      {" "}
      <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
    </h5>

    <h3 className="text-2xl font-semibold mb-5 ">Finish this ride</h3>
      <div className='flex items-center justify-between mt-4 p-3 border-2 border-yellow-400 rounded-lg '>
        <div className='flex items-center gap-3'>
        <img className='h-12 rounded-full object-cover' src="http://img.izismile.com/img/img3/20100428/640/she_makes_random_640_01.jpg" alt="" />
        <h2 className='text-lg font-medium'>User Bhai </h2>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

    <div className="flex gap-2 justify-between flex-col items-center">

      <div className="w-full mt-5 ">
        <div className="flex items-center gap-5 p-3 border-b-2 ">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-gray-600 text-sm -mt-1">kankariya Talab,Ahmedabad</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">562/11-A</h3>
            <p className="text-gray-600 text-sm -mt-1">kankariya Talab,Ahmedabad</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 ">
          <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹193.60</h3>
            <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
          </div>
        </div>
      </div>

      <div className='mt-6 w-full'>
        <Link  to="/captain-home" className=" w-full flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg">
        Finish Ride
      </Link>
      <p className='text-red-500 mt-8 text-xs'>Click on Finish Ride if you have recieved payment </p>
      
        
      </div>
    </div>
  </div>
  )
}

export default FinishRide