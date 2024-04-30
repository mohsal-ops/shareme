import React ,{useState , useEffect } from 'react'
import { MasonryLayout } from './masonryLayout'
import { client } from '../client'
import { searchQuery } from '../utils/data'
import { Spinner } from './spinner'



export const Search = ({searchTerm , setsearchTerm}) => {
  const [Pins,setPins] = useState(null)
  const [gettingPins,setgettingPins] = useState(false)
  useEffect(()=>{
    if(searchTerm !==''){
      setgettingPins(true)
      const query = searchQuery(searchTerm)
    
      client.fetch(query).then((data)=>{
        setPins(data)
        setgettingPins(false)
   })
}})
 

  
  return (
  <>
    {Pins?.length > 0 ? (
    <div>
      <MasonryLayout pins={Pins}/>
    </div>
  ):(
    <div className='flex m-3 items-center justify-center'>
    <h2 className='font-semibold'> No pin matches </h2>
    </div>

  )}
  </>
  )
}

