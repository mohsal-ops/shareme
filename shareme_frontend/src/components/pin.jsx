import React , {useState}from 'react'
import { fetchUser} from '../utils/fetchUser'
import  {urlFor,client}  from '../client'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiOutlineVerticalAlignMiddle, AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'



export const Pin = ({pin}) => {
    const {postedBy , image ,_id , destination , save} = pin
    const [PostHovered, setPostHovered] = useState(false)
    const user = fetchUser()
    const navigate = useNavigate()
    const alreadySaved = !!( save?.filter((item)=> item?.postedBy?._id === user?.googleId).length);
    
    const savePin= (id) => {
        if(!alreadySaved){
        client
        .patch(id)
        .setIfMissing({ save: []})
        .insert('after', 'save[-1]',[{
            _key :uuidv4(),
            userId: user?.googleId,
            postedBy: {
                _key:'postedBy',
                _ref:user?.googleId
            }
        }])
        .commit()
        .then(()=>{
            window.location.reload()
        })
    }   
    } 
    const deletePin = (id) =>{
    client.delete(id).then(()=>{
        window.location.reload()
    })

    }    
  return (
    
    <div className='m-2'>
        <div
        onMouseEnter={()=> setPostHovered(true)}
        onMouseLeave={()=> setPostHovered(false)}
        onClick={()=>navigate(`/pin-details/${_id}`)}
        className='relative w-auto cursor-zoom-in md:w-auto over:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
        >
        <img className='rounded-lg w-full  ' alt='user-post' src={(urlFor(image).width(250).url())}/>
        {PostHovered &&
        <div
        className=' absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pr-2 pb-2 z-50'
        style={{height:'100%'}}
        >
            <div className='gap-2 flex justify-between'>
                <a href={`${image?.asset?.url}?dl=`}
                download
                onClick={(e)=> e.stopPropagation()}
                className='bg-white opacity-75 w-9 h-9 text-xl   flex justify-center rounded-full items-center hover:opacity-100 hover:shadow-md outline-none'
                >
                    <MdDownloadForOffline />
                </a>
                <div>
                    {alreadySaved ? (
                        <button
                        type='button'
                        className=' flex items-center justify-center px-5 py-1 rounded-3xl font-medium  bg-red-500 opacity-75 hover:opacity-100 text-white hover:shadow-md outline-none  '
                        >
                        {save?.length} Saved
                        </button>
                    ):(
                        <buuton
                        onClick={(e)=>{
                            e.stopPropagation()
                            savePin(_id)    
                        }} 
                        type='button'
                        className='cursor-pointer flex items-center justify-center px-5 py-1 rounded-3xl font-bold  bg-red-500 opacity-75 hover:opacity-100 text-white text-base hover:shadow-md outline-none  '
                        >
                            Save
                        </buuton>
                    )}
                </div>
            </div>
            <div
            className='flex justify-between gap-2 items-center w-full '
            >
                {destination && (
                
                <a
                className='bg-white opacity-75 text-bold hover:shadow-md hover:opacity-100 p-1 pl-4 pr-4  rounded-full text-black  flex items-center gap-2 '
                href={destination}
                target='_blank'
                rel="norefrence"
                >
                    <BsFillArrowUpRightCircleFill  />
                    {destination.length > 20 ? destination.slice(8,20) : destination.slice(8)}
                </a> 
                )}
                {postedBy?._id === user?.googleId && (
                   <button
                   type='button'
                   className='bg-white opacity-75 text-bold hover:shadow-md hover:opacity-100 p-2 rounded-full text-black  flex items-center '
                   onClick={(e)=>{
                    e.stopPropagation()
                    deletePin(_id)
                   }}
                   
                   >
                    <AiTwotoneDelete/>
                   </button> 
                )}
            </div>    
        </div>    
        }


        </div>  
        <Link to={`user-profile/${postedBy?._id}`} className='flex mt-2 items-center gap-2 text-bold'>
       
            <img src={postedBy?.image} alt='user-profile' className='w-8 h-8 rounded-full object-cover'/>
            <p className='font-bold text-xs'>{postedBy?.userName}</p> 
         
        </Link>
        
    </div>
  )
}
