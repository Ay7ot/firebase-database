import { useEffect } from 'react'
import { useAuth } from '../Contexts/AppContext'
import { logout } from '../Functions/functions'
import { RiUserReceivedFill } from 'react-icons/ri'
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'

export default function Header() {
    const {currentUser, dispatch, username} = useAuth()
    
    useEffect(()=>{
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
    },[])
    
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
            <p>Welcome: {username}</p>
            </div>
        </div>
    )
}
