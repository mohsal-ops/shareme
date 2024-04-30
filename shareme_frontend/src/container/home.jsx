import React , {useState , useRef , useEffect }from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { Link , BrowserRouter as Router , Routes , Route } from 'react-router-dom'

import { Sidebar } from '../components/sidebar'
import { UserProfile } from '../components/userProfile'
import {client} from '../client'
import Pins from './pins'
import logo from '../assets/logo.png'
import {userQuery} from '../utils/data'
import { fetchUser } from '../utils/fetchUser'

export const Home = () => {

  const [ToggleSidebar,setToggleSidebar] = useState(false)
  const [user, setuser] = useState(null)
  const scrollRef = useRef(null)
  const userInfo = fetchUser()
  
  useEffect(()=>{
    const query = userQuery(userInfo?.googleId)
    client.fetch(query).then((data)=>{
      setuser(data[0])
     
    })
  },[])
  
  useEffect(()=>{
    scrollRef.current.scrollTo(0,0)
  },[])




  return (
    <div  className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out ' >
        <div className='hidden md:flex h-screen flex-initial'>
          <Sidebar user={user && user}/>        
        </div>
        <div className='flex md:hidden flex-row z-10 '>
          <div className='p-2 w-full flex justify-between items-center shadow-md'>
          <HiMenu fontSize={40} className='cursor-pointer' onClick={()=>setToggleSidebar(true)}/>
          <Link to="/">
            <img src={logo} alt='logo' className='w-28 '/>
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img src={user?.image} alt='image' className='w-12 rounded-lg'/>
          </Link>
        </div>
           {ToggleSidebar && (
          <div className='fixed bg-white w-4/5 h-screen overflow-y-auto shadow-md z-30 animate-slide-in'>
            <div className='absolute w-full flex justify-end items-center p-2'>
                <AiFillCloseCircle fontSize={30} className='cursor-pointer' onClick={()=>{setToggleSidebar(false)}}/>
            </div>
            <Sidebar user={user && user} closeToggle={setToggleSidebar} />
          </div> 
            )}

          </div>
         <div className='pb-2 flex-1 h-screen overflow-y-scroll ' ref={scrollRef}> 
                
            <Routes>
              <Route path="/user-profile/:userId" element={<UserProfile />} />
              <Route path="/*" element={<Pins user={user && user} />} />
            </Routes>
               
          </div>

    </div>
  )
}

