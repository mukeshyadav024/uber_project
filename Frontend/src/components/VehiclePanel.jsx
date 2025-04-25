import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
 
      <h5
        onClick={() => {
          props.setVehiclePanelOpen(false);
        }}
        className="p-1 text-center absolute top-0 w-[93%] "
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-3 ">Choose a vehicle </h3>
      <div  onClick={() => {
          props.setConfirmRidePanelOpen(true);
        }}  className="flex border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between p-3">
        <img
          className="h-14"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
        <div className=" -ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo
            <span>
              <i className="ri-user-3-fill"></i>4
            </span>
          </h4>
          <h5 className="text-sm font-medium">10 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹193.60</h2>
      </div>
      <div  onClick={() => {
          props.setConfirmRidePanelOpen(true);
        }}  className="flex border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between p-3">
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            UberAuto
            <span>
              <i className="ri-user-3-fill"></i>3
            </span>
          </h4>
          <h5 className="text-sm font-medium">4 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Auto rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹113.10</h2>
      </div>
      <div  onClick={() => {
          props.setConfirmRidePanelOpen(true);
        }} className="flex border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between p-3">
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium text-base">
            Moto
            <span>
              <i className="ri-user-3-fill"></i>1
            </span>
          </h4>
          <h5 className="text-sm font-medium">5 mins away </h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, Moto rides
          </p>
        </div>
        <h2 className="text-xl font-semibold">₹70.40</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
