import React ,{useState , useEffect} from 'react'
import {useParams , useNavigate } from 'react-router-dom'
import {AiOutlineLogout} from 'react-icons/ai'
import {GoogleLogout} from 'react-google-login'

import { fetchUser } from '../utils/fetchUser'
import { userCreatedPinsQuery , userQuery , userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import { MasonryLayout } from './masonryLayout'
import { Spinner } from './spinner'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full   outline-none cursor-pointer';
const notActiveBtnStyles = 'font-bold p-2 rounded-full w-20 outline-none cursor-pointer ';


export const UserProfile = (_id) => {
  
  const [user, setuser] = useState(null)
  const [pins, setpins] = useState(null)
  const [text, settext] = useState('')
  const [ActiveBtn, setActiveBtn] = useState('created')
  const navigate = useNavigate()
  const { userId } = useParams()
  const randomImage = "https://source.unsplash.com/1600x900/?nature,photography,technology"
  const User = fetchUser(userId)

  const logout = () =>{
    localStorage.clear()
    navigate('/')
  }
  
  useEffect(()=>{
    const query = userQuery(userId)
    client.fetch(query).then((data)=>{
      setuser(data[0])
    })
  })

  useEffect(()=>{
    if(text === 'Created'){
      const pipi = userCreatedPinsQuery(userId)
      client.fetch(pipi).then((data)=>{
        setpins(data)

    })

    }else{
      const pipi = userSavedPinsQuery(userId)

      client.fetch(pipi).then((data)=>{
        setpins(data)

      })


    }

  },[text,userId])
  

  if(!user) {
    return <Spinner message="loading profile ... "/>
  }
  
  return (
    <div className='pb-2 h-full '>
      <div className= 'flex flex-col gap-2 '>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <div className='absolute top-0 right-2 z-1 m-2 '>
              {userId === User.googleId && (
              <GoogleLogout
              clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}
              render={(renderProps)=>(
                <button
                  type='button'
                  className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md '
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                    <AiOutlineLogout color='red' fontSize={20}/>
      
                </button>
              )}
              onLogoutSuccess={logout}
              cookiePolicy="single_host_origin"
              
              />
              )}

            </div>
            <img src={randomImage}
            alt='cover-picture'
            className='w-full h-370 2xl:h-510 shadow-2xl  object-cover '
            />
            <img src={user?.image}
            alt='user-image'
            className='rounded-full h-24 w-24 -mt-10 shadow-xl object-cover  '/>
            <h2 className='text-2xl font-bold mt-3'>{user?.userName}</h2>
          </div>
          <div className='flex items-center justify-center gap-5 p-9 '>
            <buuton
               onClick={(e)=>{
                settext(e.target.textContent);
                setActiveBtn('created');     
              }} 
              type='button'
              className={`${ActiveBtn === 'created' ? activeBtnStyles : notActiveBtnStyles}`}   

              >
                  Created
            </buuton>
            <buuton
              onClick={(e)=>{
                settext(e.target.textContent);
                setActiveBtn('Saved')      
              }} 
              type='button'
              className={`${ActiveBtn === 'Saved' ? activeBtnStyles : notActiveBtnStyles}`}
              >
                Saved
            </buuton>
          </div>
          <div className="px-2">
            <MasonryLayout pins={pins} />
          </div>

          {pins?.length === 0 && (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>

      </div>
      </div>
     ) 
 }
   
  


