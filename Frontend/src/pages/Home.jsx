import React, { useRef, useState } from "react";
import {useGSAP} from '@gsap/react'
import gsap from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const lookingForDriverPanelRef = useRef(null)
  const WaitingForDriverPanelRef = useRef(null)
const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
const [confirmRidePanelOpen, setConfirmRidePanelOpen] = useState(false)
const [lookingForDriverPanelOpen, setLookingForDriverPanelOpen] = useState(false)
const [WaitingForDriverPanelOpen, setWaitingForDriverPanelOpen] = useState(false)
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

useGSAP(function(){
  if(confirmRidePanelOpen){
   gsap.to(confirmRidePanelRef.current,{
       transform:'translateY(0)'
})
  }else{
   gsap.to(confirmRidePanelRef.current,{
       transform:'translateY(100%)'
})
  }
},[confirmRidePanelOpen])

useGSAP(function(){
  if(lookingForDriverPanelOpen){
   gsap.to(lookingForDriverPanelRef.current,{
       transform:'translateY(0)'
})
  }else{
   gsap.to(lookingForDriverPanelRef.current,{
       transform:'translateY(100%)'
})
  }
},[lookingForDriverPanelOpen])

useGSAP(function(){
  if(WaitingForDriverPanelOpen){
   gsap.to(WaitingForDriverPanelRef.current,{
       transform:'translateY(0)'
})
  }else{
   gsap.to(WaitingForDriverPanelRef.current,{
       transform:'translateY(100%)'
})
  }
},[WaitingForDriverPanelOpen])

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
        <div className="h-[31%] bg-white p-6 relative">
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
              <VehiclePanel setConfirmRidePanelOpen={setConfirmRidePanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>
      </div>
      <div ref={confirmRidePanelRef} className="fixed z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3">
              <ConfirmRide setConfirmRidePanelOpen={setConfirmRidePanelOpen}  setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}/>
      </div>
      <div ref={lookingForDriverPanelRef} className="fixed z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3">
           <LookingForDriver setLookingForDriverPanelOpen={setLookingForDriverPanelOpen}/>
      </div>
      <div ref={WaitingForDriverPanelRef} className="fixed z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3">
           <WaitingForDriver setWaitingForDriverPanelOpen={setWaitingForDriverPanelOpen}/>
      </div>
    </div>
  );
};

export default Home;
