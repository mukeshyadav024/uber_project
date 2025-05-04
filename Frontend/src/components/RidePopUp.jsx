import React from 'react'

const RidePopUp = (props) => {
  return (
    <div>
    <h5
      onClick={() => {
        props.setRidePopupPanelOpen(false);
      }}
      className="p-1 text-center absolute top-0 w-[93%] "
    >
      {" "}
      <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
    </h5>

    <h3 className="text-2xl font-semibold mb-5 ">New Ride Available! </h3>
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
     <div className='flex mt-5 gap-4 w-full items-center justify-between'>
     <button  onClick={() => {
        props.setRidePopupPanelOpen(false);
      }}  className="w-full px-10 bg-gray-300 text-black font-semibold p-2 rounded-lg">
        Ignore
      </button>
     <button  onClick={() => {
        props.setConfirmRidePopupPanelOpen(true);
        props.confirmRide() ////change this in future
      }}  className="w-full px-10 bg-green-600 text-white font-semibold p-2 rounded-lg">
        Accept 
      </button>
     
     </div>
    </div>
  </div>
  )
}

export default RidePopUp