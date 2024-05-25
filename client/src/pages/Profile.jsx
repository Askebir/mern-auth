import React, { useState, useEffect } from 'react'
import {useRef} from 'react'
import {getStorage, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined)
  const {currentUser} = useSelector((state) => state.user);
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError]  = useState(false)
  
  const [formData, setFormData] = useState({
    
  })
  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image])
  const handleFileUpload = async(image) =>{
     const storage = getStorage(app)    
     const fileName = new Date().getTime() + image.name;
     const storageRef = ref(storage, fileName)
     const uploadTask = uploadBytesResumable(storageRef, image);
     
     uploadTask.on(
      'state_changed',
      (snapshot) =>{
        const progress = (snapshot.bytesTansferred/
          snapshot.totalBytes)*100;
          setImagePercent(Math.round(progress))
s      }
      );
      (error)=>{
        setImageError(true)
      }
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setFormData({...formData, profilePicture:downloadURL});

        })
      }
  }
  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl font-simbold text-center my-7' >Profile</h1>
      <form className='flex flex-col'>
        <input type='file'onChange={(e) =>setImage(e.target.files[0])} ref={fileRef} hidden accept='image/*' />
        <p>
        {imageError ? (<span className='text-red-700' >Error uploading(file size must be less than 2 MB)</span>):imagePercent > 0 && imagePercent < 100 ? (
          <snap>{`'Uploading:'${imagePercent}'%'`}</snap>):imagePercent=== 100 ? (<snap className='text-green-700'>Image uploaded successfully</snap>)
        ):''}
        </p>
         <img onClick={()=>fileRef.current.click()}  src={ formData.profilePicture || currentUser.profilePicture} alt='profle' className='h-4 w-24 self-center cursor-pointer rounded-full object-cover' />
         <input defaultValue={currentUser.username} type="text" id='username' placeholder='username' className='bg-slate-100 rounded-lg p-3' />
         <input defaultValue={currentUser.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' />
         <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' />
         <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >update</button>
      </form>
      <div className="flex jusstify-between mt-5">

        <span className='text-red-700 cursor-pointer' >Delete Account</span>
        <span className='text-red-700 cursor-pointer' >Sign out</span>
      </div>
    </div>
  )
}
