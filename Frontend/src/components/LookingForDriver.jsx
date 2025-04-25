import React from 'react'

const LookingForDriver = (props) => {
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
      <img
        className="h-24 -mt-3"
        src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
        alt=""
      />
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
      
    </div>
  </div>
  )
}

export default LookingForDriver