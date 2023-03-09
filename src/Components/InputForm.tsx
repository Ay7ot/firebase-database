import React from 'react'
import { useAuth } from '../Contexts/AppContext'
import { FaPlus } from 'react-icons/fa'
import { nanoid } from 'nanoid'
import { createTodo } from '../Functions/functions'
import { Alert } from 'react-bootstrap'

export default function InputForm() {
    
    const { dispatch, todo, username, todoError } = useAuth()
    
    async function setTodoOnDatabase(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()
        if(todo.name===''){
            return dispatch({
                type: 'setTodoError',
                payload: {
                    todoErrorPayload: 'Add a todo'
                }
            })
        }
        await createTodo(username, todo)
        dispatch({
            type: 'setNoTodoName'
        })
    }
    
    return (
        <>
        {todoError !== '' && <p className='p-2 text-center text-white bg-red-300 rounded-md my-2'>{todoError}</p>}
        <form  className='flex gap-3 pt-3 justify-between' onSubmit={setTodoOnDatabase}>
            <input 
                className='bg-gray-200 p-2 rounded-md w-[90%] focus:border-blue-400 border-[2px] outline-none'
                type='text'
                placeholder='Add Todo'
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
                onClick={()=>{
                    dispatch({
                        type: 'setTodoError',
                        payload: {
                            todoErrorPayload: ''
                        }
                    })
                }}
            />
            <button className='p-3 bg-blue-400 rounded-md text-white'><FaPlus /></button>
        </form>
        </>
    )
}
