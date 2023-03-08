import React from 'react'
import { useAuth } from '../Contexts/AppContext'
import { FaPlus } from 'react-icons/fa'
import { ref, set } from 'firebase/database'
import { db } from '../firebase'
import { todoType } from '../Types/types'
import { lazy } from 'react'
import { nanoid } from 'nanoid'
import { createTodo } from '../Functions/functions'

export default function InputForm() {
    
    const { dispatch, todo, username } = useAuth()
    
    async function setTodoOnDatabase(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        await createTodo(username, todo)
        dispatch({
            type: 'setNoTodoName'
        })
    }
    
    return (
        <form  className='flex gap-3 pt-3 justify-between' onSubmit={setTodoOnDatabase}>
            <input 
                className='bg-gray-200 p-2 rounded-md w-[90%] focus:border-blue-400 border-[2px] outline-none'
                type='text'
                placeholder='Note'
                value={todo.name}
                onChange={(e)=>{
                    dispatch({
                        type: 'setTodo',
                        payload:{
                            todoPayload:{
                                name: e.target.value,
                                id: nanoid()
                            }
                        }
                    })
                }}
            />
            <button className='p-3 bg-blue-400 rounded-md text-white'><FaPlus /></button>
        </form>
    )
}
