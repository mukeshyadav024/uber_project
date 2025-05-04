import React from 'react'

const LookingForDriver = (props) => {

  const vehicleImages = {
    car: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
    auto: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png",
    motorcycle: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
  };

  return (
    <div>
    <h5
      onClick={() => {
        props.setLookingForDriverPanelOpen(false);
      }}
      className="p-1 text-center absolute top-0 w-[93%] "
    >
      <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
    </h5>

    <h3 className="text-2xl font-semibold mb-5 ">Looking for a Driver  </h3>
    <div className="flex gap-2 justify-between flex-col items-center">
    {props.vehicleType && (
          <img
            src={vehicleImages[props.vehicleType]}
            alt={props.vehicleType}
            className="h-24 -mt-3"
          />
        )}
      <div className="w-full mt-5 ">
        <div className="flex items-center gap-5 p-3 border-b-2 ">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Pickup</h3>
            <p className="text-gray-600 text-sm -mt-1">{props.pickup}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">Destination</h3>
            <p className="text-gray-600 text-sm -mt-1">{props.destination}</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 ">
          <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">₹{props.fare[props.vehicleType]}</h3>
            <p className="text-gray-600 text-sm -mt-1">Cash Cash</p>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  )
}

export default LookingForDriver