import React, { useRef, useState } from "react";
import {useGSAP} from '@gsap/react'
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)

  function submitHandler(e) {
    e.preventDefault();
  }

useGSAP(function(){
   if(panelOpen){
    gsap.to(panelRef.current,{
        height:"70%",
        padding:24

    })
    gsap.to(panelCloseRef.current,{
        opacity:1
    })
   }else{
    gsap.to(panelRef.current,{
        height:"0%",
        padding:0
 
    })
    gsap.to(panelCloseRef.current,{
        opacity:0
    })
   }
},[panelOpen])

useGSAP(function(){
   if(vehiclePanelOpen){
    gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
})
   }else{
    gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
})
   }
},[vehiclePanelOpen])

  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg"
        alt=""
      />
      <div className="h-screen w-screen ">
        {/* image for map */}
        <img
          className="h-full w-full object-cover"
          src="https://www.researchgate.net/publication/323759986/figure/fig3/AS:631576123682823@1527590890164/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] bg-white p-6 relative">
            <h5
            ref={panelCloseRef}
             onClick={()=>{
                setPanelOpen(false)
            }} className="absolute opacity-0 top-4 right-6  text-2xl"><i className="ri-arrow-down-wide-line"></i></h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form
            action=""
            onSubmit={() => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-14 w-1 top-1/2 left-10 bg-gray-900 rounded-full"></div>
            <input
            onClick={()=>{
                setPanelOpen(true)
            }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
            onClick={()=>{
                setPanelOpen(true)
            }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eeeeee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-white ">
            <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3">
      <h5
             onClick={()=>{
                setVehiclePanelOpen(false)
            }} className="p-1 text-center absolute top-0 w-[93%] "><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className="text-2xl font-semibold mb-3 ">Choose a vehicle </h3>
              <div className="flex border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between p-3">
                <img className="h-14" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className=" -ml-2 w-1/2">
                    <h4 className="font-medium text-base">UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className="text-sm font-medium">10 mins away </h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                <h2 className="text-xl font-semibold">₹193.60</h2>
              </div>
              <div className="flex border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between p-3">
                <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-medium text-base">UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className="text-sm font-medium">4  mins away </h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, Auto rides</p>
                </div>
                <h2 className="text-xl font-semibold">₹113.10</h2>
              </div>
              <div className="flex border-2 mb-2 active:border-black rounded-xl w-full items-center justify-between p-3">
                <img className="h-14" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-medium text-base">Moto  <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className="text-sm font-medium">5 mins away </h5>
                    <p className="font-normal text-xs text-gray-600">Affordable, Moto rides</p>
                </div>
                <h2 className="text-xl font-semibold">₹70.40</h2>
              </div>
              
      </div>
    </div>
  );
};

export default Home;
