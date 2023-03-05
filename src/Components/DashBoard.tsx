import { getAuth } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { logout } from '../Functions/functions'
import { useAuth } from '../Contexts/AppContext' 

export default function DashBoard() {
    const { currentUser, dispatch } = useAuth()

    const [currentTime, setCurrentTime] = useState('') 
    const [currentDate, setCurrentDate] = useState('') 
    

    function handleLogout(){
        logout()
        dispatch({
            type: 'setNoUser'
        })
        
    }
    
    useEffect(() => {
        const newDate = new Date().toLocaleDateString()
        setCurrentDate(newDate)
    }, [])
    
    
    useEffect(() => {
        const newTime = new Date().toLocaleTimeString()
        setCurrentTime(newTime)
    }, [currentTime])
    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    return (
        <div className='flex items-center justify-center'>
            <div className='m-2 rounded-md h-[80vh]'>
                <div>
                    <p>{currentTime}</p>
                </div>
                <button className='bg-blue-300 w-[100px] p-2 rounded-md' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
