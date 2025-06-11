import React from 'react'

const FullPageLoader = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-white/10 flex items-center justify-center z-50'>
        <div className='size-10 rounded-full border-3 border-white border-b-blue-400 animate-spin'></div>
    </div>
  )
}

export default FullPageLoader