import React from 'react'

const LocationSearchPanel = (props) => {

const {setPanelOpen,setVehiclePanelOpen
}= props
  const locations = [
    "156, pandesar near ram mandir, surat, gujarat",
    "12B, Vesu near D-Mart, surat, gujarat",
    "11DC, Bhestan ambedkar chowki, surat, gujarat",
    "19, Althan near hanuman mandir, surat, gujarat",
  ]

  return (
    
    <div>
      {
        locations.map((location,idx)=>{
          return     <div key={idx} onClick={()=>{
            setVehiclePanelOpen(true)
            setPanelOpen(false)
          }} className='flex gap-3 items-center justify-start my-2 border-2 border-gray-100 active:border-black rounded-xl p-3'>
          <h2 className='bg-[rgb(238,238,238)] h-10 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
          <h4 className='font-medium'>{location}</h4>
        </div>
        })
      }


    </div>
  )
}

export default LocationSearchPanel