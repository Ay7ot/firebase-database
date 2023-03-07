import { onValue, ref } from 'firebase/database'
import {useEffect} from 'react'
import { useAuth } from '../Contexts/AppContext'
import { db } from '../firebase'

export default function Todos() {
    
    const { todos, username, dispatch } = useAuth()
    
    useEffect(()=>{
        onValue(ref(db, 'users/' + username), snapshot=>{
         dispatch({
            type: 'setNoTodos'
         })
         const data = snapshot.val()
         if(data !== null){
            console.log(data)
         }
        }) 
     },[])
    
    return (
        <div className='overflow-y-scroll pt-4'>
            {todos.map(todo=>{
                return (
                    <div>
                        
                    </div>
                )
            })}
        </div>
    )
}
