import React, { useState, useEffect } from 'react'
import {useRef} from 'react'
import {getStorage,getDownloadURL, ref, uploadBytesResumable} from 'firebase/storage';
import {app} from '../firebase';
import {useDispatch} from 'react-redux'
import {updateUserStart, updateUserSuccess, updateUserFailur, deleteUserSart, deleteUserSuccess,deleteUserFailure} from '../redux/user/userSlice'

export default function Profile() {
  const dispatch = useDispatch()
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined)
  const [imagePercent, setImagePercent] = useState(0)
  const [imageError, setImageError]  = useState(false)
  const [updateSuccess, setUpdateSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    
  })
  const {currentUser, loading, errorl} = useSelector((state) => state.user);


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

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }


  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update ${currentUser._id}`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailur(data));
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    }catch(error){
      dispatch(updateUserFailur(error))

    }
  }

  const handleDeleteAccount = async () =>{
    try{
      dispatch(deleteUserSart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data))
        return;
      }
      dispatch(seleteUserSuccess(data));
    }catch(error){
      dispatch(deleteUserFailure(error))

      
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl font-simbold text-center my-7' >Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col'>
        <input type='file'onChange={(e) =>setImage(e.target.files[0])} ref={fileRef} hidden accept='image/*' />
        <p>
          
        </p>
         <img onClick={()=>fileRef.current.click()}  src={ formData.profilePicture || currentUser.profilePicture} alt='profle' className='h-4 w-24 self-center cursor-pointer rounded-full object-cover' />
         <input defaultValue={currentUser.username} type="text" id='username' placeholder='username' className='bg-slate-100 rounded-lg p-3' />
         <input onChange={handleChange} defaultValue={currentUser.email} type="email" id='email' placeholder='Email' className='bg-slate-100 rounded-lg p-3' />
         <input onChange={handleChange} type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg p-3' />
         <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80' >update</button>
      </form>
      <div className="flex jusstify-between mt-5">

        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer' >Delete Account</span>
        <span className='text-red-700 cursor-pointer' >Sign out</span>
      </div>
      <p className='text-red-700 mt-5' >{error && 'Something went wrong!'}</p>
    </div>
  )
}
