import React from 'react'

export default function Profile() {
  return (
    <div className='p-3 max-w-lg mx-auto' >
      <h1 className='text-3xl font-simbold text-center my-7' >Profile</h1>
      <form className='flex flex-col'>
         <img src={currentUser.profilePicture} alt='profle' className='h-4 w-24 self-center cursor-pointer rounded-full object-cover' />
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
