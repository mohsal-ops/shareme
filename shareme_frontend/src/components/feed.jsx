import React , {useState  , useEffect} from 'react'
import { useParams } from 'react-router-dom'

import { client } from '../client'
import {MasonryLayout} from './masonryLayout'
import{ Spinner } from './spinner'
import { feedQuery, searchQuery } from '../utils/data'


export const Feed = () => {

  const [loading, setloading] = useState(false)
  const [Pins, setPins] = useState()
  const{categoryId} = useParams()


  
  useEffect(()=>{
  if(categoryId){
    setloading(true);
    const query = searchQuery(categoryId)
    client.fetch(query).then((data)=>{
      setPins(data)
      setloading(false);
    })
  }
  else {
    client.fetch(feedQuery).then((data)=>{
     setPins(data)
     
     setloading(false)
    })
    

  }

},[categoryId])





  if(loading) return <Spinner message="we are adding new ideas to your feed"/>
  if(Pins?.length === 0 ) return <h2 className='font-bold flex justify-center'>No Pins available</h2>
  return (
    <div>
      {Pins && (
      <MasonryLayout pins ={Pins} />
      )}

    </div>
  )
}

