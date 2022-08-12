import React from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../Layout/MetaData'
import { useSelector } from 'react-redux'
import Loader from '../Layout/Loading/Loader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {


    let navigate = useNavigate();
    const {user,loading,isAuthenticated} = useSelector(state=>state.user)
    
    useEffect(() => {
      if(isAuthenticated === false){
        navigate("/login")
      }
    
     
    }, [navigate,isAuthenticated])
    


  return (
    <>
    {loading?<Loader/>:<>
    <MetaData title={`${user.name}'s Profile`}/>
    <div className="profileContainer flex flex-col items-center     md:flex-row md:h-screen w-full">
            <div className='w-full md:w-1/2 flex flex-col items-center gap-10 justify-center'>
              <h1 className='text-2xl '>My Profile</h1>
              <img src={user.avatar.url} alt={user.name} className="rounded-full" />
              <Link to="/me/update" className='border bg-orange-500 text-white px-4 py-1 rounded hover:bg-white hover:text-orange-500 hover:border-orange-500'>Edit Profile</Link>
            </div>
            <div className=' py-2 md:w-1/2 flex flex-col w-full items-center md:items-start justify-center gap-10 px-2' >
              <div className='text-center md:text-start '>
                <h4 className='text-lg font-semibold'>Full Name</h4>
                <p className='text-base font-regular text-slate-500'>{user.name}</p>
              </div>
              <div className='text-center md:text-start'>
                <h4 className='text-lg font-semibold'>Email</h4>
                <p className='text-base font-regular text-slate-500'>{user.email}</p>
              </div>
              <div className='text-center md:text-start'>
                <h4 className='text-lg font-semibold'>Joined On</h4>
                <p className='text-base font-regular text-slate-500'>{String(user.createdAt).substr(0, 10)}</p>
              </div>

              <div className='flex flex-col items-center md:items-start   gap-2  w-full'>
                <Link to="/orders" className='border border-black bg-gray-800 text-white w-1/2 text-center rounded py-1 hover:text-gray-800 hover:bg-white  hover:border-gray-800'>My Orders</Link>
                <Link to="/password/update" className='border border-black bg-gray-800 text-white w-1/2 text-center rounded py-1 hover:text-gray-800 hover:bg-white  hover:border-gray-800'>Change Password</Link>
              </div>
            </div>
          </div>

    </>}
    </>
  )
}

 export default Profile