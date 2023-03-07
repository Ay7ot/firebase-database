import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { logout } from '../Functions/functions'
import { useAuth } from '../Contexts/AppContext' 
import { FaPlus } from 'react-icons/fa'

export default function DashBoard() {
    const { currentUser, dispatch, todo } = useAuth()

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
    
    const style={
        height: '200px',
        width: '100%',
        backgroundImage: 'url("flower.jpg")',
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }
    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    return (
        <div className='flex items-center justify-center mx-5 min-h-screen'>
            <div className='rounded-[1rem] bg-white h-[650px] w-full max-w-[450px] overflow-clip'>
                <div style={style} className='p-2'>
                    <p>Welcome: {}</p>
                </div>
                <div className='px-4 py-2'>
                    <form  className='flex gap-3 pt-3 justify-between'>
                        <input 
                            className='bg-gray-200 p-2 rounded-md w-[90%] focus:border-blue-400 border-[2px] outline-none'
                            type='text'
                            placeholder='Note'
                            value={todo}
                            onChange={(e)=>{
                                dispatch({
                                    type: 'setTodo',
                                    payload:{
                                        todoPayload: e.target.value
                                    }
                                })
                            }}
                        />
                        <button className='p-3 bg-blue-400 rounded-md text-white'><FaPlus /></button>
                    </form>
                    <div className='overflow-y-scroll pt-4'>
                        
                    </div>
                </div>
                <button className='bg-blue-300 w-[100px] p-2 rounded-md' onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}
