import React , {useState} from 'react'
import {Routes , Route } from 'react-router-dom'

import { CreatePin   } from '../components/createPin'
import { Search } from '../components/search'
import { Navbar } from '../components/navbar'
import { PinDetails } from '../components/pinDetail'
import { Feed } from '../components/feed'


const Pins = ({ user }) => {
  const [searchTerm, setsearchTerm] = useState("")
  return (
    <div className='px-2 md:px-5 '>
      <div className=' bg-gray-50'>
        <Navbar searchTerm={searchTerm} setsearchTerm={setsearchTerm} user={user}/>
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/category/:categoryId' element={<Feed/>}/>
          <Route path='/pin-details/:pinId' element={<PinDetails user={user}/>}/>
          <Route path='/create-pin' element={<CreatePin user={user}/>}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />}/>
        </Routes>

      </div>

    </div>
  )
}
export default Pins


