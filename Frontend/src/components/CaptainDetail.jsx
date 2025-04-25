import React from 'react'

const CaptainDetail = () => {
  return (
    <div><div className='flex items-center justify-between '>
    <div className='flex items-center justify-between gap-3'>
    <img className='h-12 rounded-full object-cover' src="https://tse4.mm.bing.net/th?id=OIP.iattzUh9ORYsWdrgKMmAWAHaHU&pid=Api&P=0&h=180" alt="" />
      <h4 className='text-lg font-medium'>Captain Bhai</h4>
    </div>
    <div>
      <h4 className='text-xl font-semibold'>₹193.20</h4>
      <p className='text-sm text-gray-600'>Earned</p>
    </div>
  </div>
  <div className='flex p-3 mt-8 rounded-lg bg-gray-100 justify-center gap-5 items-start'>
    <div className='text-center'>
      <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div>
    <div className='text-center'> 
      <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div>
    <div className='text-center'>
      <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
      <h5 className='text-lg font-medium'>10.2</h5>
      <p className='text-sm text-gray-600'>Hours Online</p>
    </div>
  </div></div>
  )
}

export default CaptainDetail