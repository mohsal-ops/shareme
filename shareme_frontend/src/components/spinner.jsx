import React from 'react'
import {Circles} from 'react-loader-spinner';


export  const Spinner = ({message}) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full '>
      <Circles
        height={60}
        width={100}
        color="#00BFFF"
        ariaLabel="circles-loading"
        className="m-5"
        visible={true}
/>
      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

