import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setWaitingForDriverPanelOpen(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%] "
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
{/* h3 */}
<div className='flex items-center justify-between'>
    
    
    <img className='h-14 rounded-full object-cover' src="https://tse4.mm.bing.net/th?id=OIP.iattzUh9ORYsWdrgKMmAWAHaHU&pid=Api&P=0&h=180" alt="" />
    <div className='text-right'>
        <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
        <h4 className='text-xl -mt-1 font-semibold'>{props.ride?.captain.vehicle.plate}</h4>
        <p className='text-sm -mt-1 text-gray-600'>Marui Suzuki Alto </p>
        <h1 className='text-lg font-semibold ml-4'>OTP: {props.ride?.otp}</h1>
    </div>
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
      </div>
    </div>
  )
}

export default WaitingForDriver