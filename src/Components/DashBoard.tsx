import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { logout } from '../Functions/functions'
import { useAuth } from '../Contexts/AppContext' 
import { FaPlus } from 'react-icons/fa'
import { onValue, ref, set } from '@firebase/database'
import { db } from '../firebase'
import { todoType } from '../Types/types'
import InputForm from './InputForm'
import Todos from './Todos'
import Header from './Header'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'

export default function DashBoard() {
    const { currentUser, dispatch , username} = useAuth()

    const location = useLocation()
    
    useEffect(()=>{
        window.scrollTo(0, 0);
        onValue(ref(db, '/users'), snapshot=>{
         const data = snapshot.val()
         if(data !== null){
            for(let key in data) {
               if(data[key].email === currentUser?.email){
                    dispatch({
                        type: 'setUsername',
                        payload: {
                            signUps:{
                                usernamePayload: data[key].username
                            }
                        }
                    })
               }
            }
        }
        }) 
    },[location.pathname])
    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    if(username === ''){
        return <Loader />
    }
    
    return (
        <div className='flex items-center justify-center mx-5 min-h-screen'>
            <div className='rounded-[1rem] bg-white h-[650px] w-full max-w-[450px] overflow-clip'>
                <Header />
                <div className='px-4 py-2'>
                    <InputForm />
                    <Todos />
                </div>
            </div>
        </div>
    )
}
