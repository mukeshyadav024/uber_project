import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

    const [finishRidePanelOpen, setFinishRidePanelOpen] = useState(false)
    const finishRidePanelRef = useRef(null)


    useGSAP(function(){
        if(finishRidePanelOpen){
         gsap.to(finishRidePanelRef.current,{
             transform:'translateY(0)'
      })
        }else{
         gsap.to(finishRidePanelRef.current,{
             transform:'translateY(100%)'
      })
        }
      },[finishRidePanelOpen])

  return (
    <div className='h-screen '>
           

   <div className='fixed p-6 top-8 z-10 flex items-center justify-between w-screen'>
    <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/5/58/Uber_logo_2018.svg" alt="" />
    <Link to='/captain-home' className='right-2 top-2 rounded-full flex h-10 w-10 bg-white items-center justify-center'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
   </div>

     <div className='h-4/5'>
     <LiveTracking />
    </div>
    <div
    onClick={()=>{
        setFinishRidePanelOpen(true)
    }} 
    className='h-1/5 p-6 relative bg-yellow-400 flex items-center justify-between'>
    <h5
      className="p-1 text-center absolute top-0 w-[80%] "
    >
      <i className="text-3xl text-black-300 ri-arrow-up-wide-line"></i>
    </h5>
    <h4 className='text-xl font-semibold'>4 KM away </h4>
     <button  className="px-10 bg-green-600 text-white font-semibold p-2 rounded-lg"> Complete Ride</button>

    </div>

    <div ref={finishRidePanelRef}  className="fixed h-[80%] z-10 w-full translate-y-full bottom-0 bg-white py-10 px-3">
        <FinishRide setFinishRidePanelOpen={setFinishRidePanelOpen}/>
      </div>

   </div>
  )
}

export default CaptainRiding