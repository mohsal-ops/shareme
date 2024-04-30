import React from "react"
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logo.png'
import logowhite from '../assets/logowhite.png'
import { useEffect}  from 'react'
import { gapi } from 'gapi-script'
import {client} from '../client'



export const Login = () => {
  const navigate = useNavigate();
  const clientId = "861569835075-fpdvtoa94lgff9ct654idgldpk906q6f.apps.googleusercontent.com"
  const responseGoogle = (res) =>{  
    localStorage.setItem('user' , JSON.stringify(res.profileObj))

    const { name , googleId , imageUrl } = res.profileObj;

    const doc = {
      _id : googleId,
      _type:'user',
      userName:name,
      image:imageUrl,

    }
    client.createIfNotExists(doc).then(()=>{
      navigate('/', {replace:true})
    })
 }  



 useEffect(()=>{
  function start() {
    gapi.client.init({
      clientId : clientId,
      scope:""
    })
  };
  gapi.load('client:auth2',start )
 } 
 
 )
  return (
  <div className="flex justify-start items-center flex-col h-screen " >
    <div className="relative h-full w-full">
      <video 
      src={shareVideo}
      type="video/mp4"
      loop
      controls={false}
      muted
      autoPlay
      className="h-full w-full object-cover"
      /> 
      <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay ">
        <div className="p-5 ">
          <img src={logowhite} width="130px" alt="logo"/>
        </div>
        <div className="shadow-2xl">
          <GoogleLogin
          clientId={clientId}
          render={(renderProps)=>{
            <button
            type="button"
            className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            >

             <FcGoogle className="mr-4"/>  Singn in with Google
            </button>
          }}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy= {'single_host_origin'}
          />
         
        </div>

      </div>
    </div>
  </div>
  )
}
