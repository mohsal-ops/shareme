import React, {useEffect, useState} from 'react'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { useNavigate} from 'react-router-dom'
import {MdDelete} from 'react-icons/md'

import { client } from '../client'
import { categories } from '../utils/data'
import {Spinner} from './spinner'





export const CreatePin = ({user}) => {
  const [title, settitle] = useState('')
  const [loading, setloading] = useState(false)
  const [about, setabout] = useState('')
  const [destination, setdestination] = useState()
  const [fields, setfields] = useState()
  const [category, setcategory] = useState()
  const [imageAsset, setImageAsset] = useState()
  const [wrongImageType, setwrongImageType] = useState(false)

  

  const navigate = useNavigate();
  const uploadImage = (e) => {
    const {type , name} = e.target.files[0]
    if( type === 'image/png' ||type === 'image/jpg' || type === 'image/svg' || type === 'image/jpeg' || type === 'image/gif' || type === 'image/tiff'){
      setwrongImageType(false)
      setloading(true)
      client.assets.upload('image' ,e.target.files[0] , { contentType:type , filename: name  } ).then((document) => {
        setImageAsset(document)
        setloading(false)
      }).catch((err)=> console.log('image upload err', err))


    }else {
      setwrongImageType(true)
    }

  }
  const savePin = () =>{
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: 'pin',
        title,
        about,
        destination,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user?._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user?._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setfields(true);
      window.scrollTo({
        top:0,
        behavior:'smooth' , 
      })

      setTimeout(
        () => {
          setfields(false);
          
        },
        2000,
      );
    }
    
    
  }



  return (
    
    <div className='flex items-center justify-center flex-col lg:h-4/5'>
      {fields && (
        <p className='mb-5 text-xl transition-all duration-150 ease-in text-red-600'>please add the fields</p>
      )}
      <div className='flex  lg:flex-row bg-white flex-col p-3 lg:p-5 lg:w-4/5 w-full gap-2'>
        <div className='bg-secondaryColor p-3 flex flex-0.7 w-full'>
          <div className='flex flex-col justify-center items-center border-2 border-dotted border-gray-300 p-3 w-full h-420'>
              {loading && (
                <Spinner/>
              )}
              {wrongImageType && (
                <p>It&apos;s wrong file type.</p>
              )}
              {!imageAsset ? (
              <label>
              <div className='flex flex-col justify-center  items-center h-64 '>
                <div className='flex flex-col justify-center  items-center h-full'> 
                  <p className='text-xl font-normal flex flex-col items-center justify-center p-2'>
                    <AiOutlineCloudUpload fontSize={30}/>
                    <p className='text-lg'>Click to apload </p>
                  </p>
                  </div>
                  <p className='text-gray-500 '>
                  Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                  </p> 
                  </div>
                  
                  <input 
                    type="file"
                    onChange={uploadImage}
                    className='w-0 -h-0'
                    name='upload-image' 
                  />
               </label>
              ):(
                <div className='relative h-full '>
                  <img src={imageAsset?.url} alt='uploaded-image' className='w-full h-full '/>
                  <button
                  type='button'
                  onClick={()=> setImageAsset(null)}
                  className='absolute bottom-2  text-xl outline-none right-3 p-3 rounded-full bg-white opacity-75 hover:opacity-100 hover:shadow-md transition-all duration-500 ease-in-out '>
                    <MdDelete/>
                  </button>
                </div>
              )
            
            }
          </div>
         
        </div> 
        <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full  '>
          <input 
          type="text"
          value={title}
          placeholder='Add your title' 
          onChange={(e)=>settitle(e.target.value)}
          className='outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'/>
          {user &&(
            <div className='flex gap-2 items-center h-16 '>
            
            <img src={user?.image} alt='user-image' className='rounded-full h-10 w-10 ml-2'/>
            <p className=' font-bold '>{user?.userName}</p>
            
          </div>  
            )}
          
          <input 
          type="text"
          value={about}
          placeholder='Tell evryone what your pin is about ' 
          onChange={(e)=>setabout(e.target.value)}
          className=' outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2'/>
          <input 
          type="url"
          value={destination}
          placeholder='Add adestination link' 
          onChange={(e)=>setdestination(e.target.value)}
          className=' outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2 mt-3 '/>
          <div className='flex flex-col'>
            <div>
            <p className='mb-2 font-semibold text-lg sm:text-xl'>Choose pin category</p>
            <select 
            onChange={(e)=> setcategory(e.target.value)}
            className='outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
              <option value="others"  className='bg-whote '>
                Select category
              </option>
              {categories.map((category)=>(
                <option value={category.name} className='text-base outline-none border-0 capitalizebg-white text-black '>
                  {category.name}
                </option>
              ))}
            </select>
            </div>
            <div className='flex justify-end items-end mt-10'>
              <button
              type='button'
              onClick={savePin}
              className='flex items-center justify-center px-5 py-3 rounded-3xl font-bold  bg-red-500 text-white text-base hover:shadow-md outline-none  '>
               Save pin
              </button>
                 
            </div>
          </div>
          

            
             
          </div>

      </div>


    </div>
  )
}
