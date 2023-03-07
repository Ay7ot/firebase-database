import React from 'react'
import { useAuth } from '../Contexts/AppContext'
import { FaPlus } from 'react-icons/fa'
import { ref, set } from 'firebase/database'
import { db } from '../firebase'
import { todoType } from '../Types/types'
import { lazy } from 'react'

export default function InputForm() {
    
    const {dispatch, todo, username} = useAuth()
    
    function setTodoOnDatabase(todo: todoType){
        const reference = ref(db, '/users' +  + '/todo')
        set(reference, {
            name: todo.name,
            id: todo.id,
            isComplete: todo.isComplete,
        })
    }
    
    return (
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
    )
}
