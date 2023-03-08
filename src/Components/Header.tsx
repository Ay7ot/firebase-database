import { useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext'
import { logout } from '../Functions/functions'
import { RiUserReceivedFill } from 'react-icons/ri'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'

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
            <i onClick={handleLogout} className='font-bold text-[1.7rem] text-white absolute left-[90%]'><RiUserReceivedFill /></i>
            <p className='pt-[120px] text-right font-bold text-white text-[1.7rem]'>Welcome <span className='text-[#ff1028] font-extrabold text-[1.9rem]'>{username}</span>!</p>
            </div>
        </div>
    )
}
