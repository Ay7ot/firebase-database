import { useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext'
import { logout } from '../Functions/functions'
import { RiUserReceivedFill } from 'react-icons/ri'
import {HiUserMinus} from 'react-icons/hi2'

export default function Header() {
    const { dispatch, username} = useAuth()
    
    const style={
        height: '200px',
        width: '100%',
        backgroundImage: 'url("flower.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }
    
    function handleLogout(){
        logout()
        dispatch({
            type: 'setNoUser'
        })
        
    }
    
    return (
        <div style={style} className='p-2'>
            <div className='relative mt-4'>
            <i onClick={handleLogout} className='font-bold text-[1.7rem] text-white'><HiUserMinus /></i>
            <p className='pt-[20px] font-bold text-white text-[1.7rem]'>Welcome <span className='text-[#16f7f7] font-extrabold text-[1.9rem]'>{username}</span>!</p>
            <p className=' text-[1.2rem] font-semibold text-[#3cf1f1] tracking-wide'>What would you like to <span className='text-[#f9331d] font-extrabold text-[1.4rem]'>TICK</span> off your tasks?</p>
            </div>
        </div>
    )
}
