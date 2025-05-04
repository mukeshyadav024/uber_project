import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import CaptainDetail from '../components/CaptainDetail';
import RidePopUp from '../components/RidePopUp';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ConfirmRidePopup from '../components/ConfirmRidePopup';
import { useEffect } from 'react';
import { SocketContext } from '../context/SocketContext';
import { CaptainContextData } from '../context/CaptainContext';

const CaptainHome = () => {


const [ridePopupPanelOpen, setRidePopupPanelOpen] = useState(false)
const [confirmRidePopupPanelOpen, setConfirmRidePopupPanelOpen] = useState(false)
const [ride, setRide] = useState(null)
const ridePopupPanelRef = useRef(null)
const confirmRidePopupPanelRef = useRef(null)
const {captain}=useContext(CaptainContextData)
const {socket} = useContext(SocketContext)

useEffect(()=>{
  socket.emit('join', {
    userId: captain._id,
    userType: 'captain'
  })

  const updateLocation = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude, longitude} = position.coords
        // console.log( {
        //   userId: captain._id,
        //   location:{
        //     lng:longitude,
        //     ltd:latitude
        //   }
        // });
        

        
        socket.emit('update-location-captain', {
          userId: captain._id,
          location:{
            lng:longitude,
            ltd:latitude
          }
        })
      })
    }


  }

  const locationInterval = setInterval(updateLocation, 10000)
  updateLocation()

// return () => clearInterval(locationInterval)

})

// console.log("home");
socket.on('New-ride', (data) => {
  console.log('New ride request:', data);
  setRide(data)
  setRidePopupPanelOpen(true)
  
})

////change this in future

// async function confirmRide() {
//   socket.emit('confirm-ride', { 
//     rideId: ride._id,
//     userId: captain._id
//   })
//   setConfirmRidePopupPanelOpen(true)
//   setRidePopupPanelOpen(false)
// }


useGSAP(function(){
  if(ridePopupPanelOpen){
   gsap.to(ridePopupPanelRef.current,{
       transform:'translateY(0)'
})
  }else{
   gsap.to(ridePopupPanelRef.current,{
       transform:'translateY(100%)'
})
  }
},[ridePopupPanelOpen])

useGSAP(function(){
  if(confirmRidePopupPanelOpen){
   gsap.to(confirmRidePopupPanelRef.current,{
       transform:'translateY(0)'
})
  }else{
   gsap.to(confirmRidePopupPanelRef.current,{
       transform:'translateY(100%)'
})
  }
},[confirmRidePopupPanelOpen])

  return (
    <div className='h-screen'>
   <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
    <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
    <Link to='/captain-home' className='right-2 top-2 rounded-full flex h-10 w-10 bg-white items-center justify-center'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
   </div>

     <div className='h-3/5'>
         <img
          className="h-full w-full object-cover"
          src="https://www.researchgate.net/publication/323759986/figure/fig3/AS:631576123682823@1527590890164/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
          alt=""
        />
    </div>
    <div className='h-2/5 p-6'>
      <CaptainDetail />

    </div>

    <div ref={ridePopupPanelRef}  className="fixed z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3">
        <RidePopUp 
      //  confirmRide={confirmRide} ////change this in future
         ride={ride}
        setRidePopupPanelOpen={setRidePopupPanelOpen} setConfirmRidePopupPanelOpen={setConfirmRidePopupPanelOpen} />
      </div>
    <div ref={confirmRidePopupPanelRef}  className="fixed h-screen z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3">
        <ConfirmRidePopup 
         ride={ride}
        setConfirmRidePopupPanelOpen={setConfirmRidePopupPanelOpen} setRidePopupPanelOpen={setRidePopupPanelOpen} />
      </div>



   </div>
  )
}

export default CaptainHome