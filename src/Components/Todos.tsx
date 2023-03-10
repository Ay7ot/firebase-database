import { onValue, ref, remove, set, get, update } from 'firebase/database'
import {useEffect, useState} from 'react'
import { useAuth } from '../Contexts/AppContext'
import { db } from '../firebase'
import { todoType } from '../Types/types'
import {BsCheck} from 'react-icons/bs'
import {MdDeleteForever} from 'react-icons/md'
import { markCompleteInDB, rearrangeArrayFromBack } from '../Functions/functions'

export default function Todos() {
    
    const { todos, dispatch, username } = useAuth()
   
    const [numTodos, setNumTodos] = useState(0)
    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        dispatch({
            type: 'setNoTodos'
        })
        onValue(ref(db, `users/${username}/todos`), snapshot=>{
            const data = snapshot.val()
            if(data!== null){
                let dataArray = []
                for(let key in data){
                    let item = data[key]
                    dataArray.push(item)
                }
                setNumTodos(dataArray.length)
                const newArray = rearrangeArrayFromBack(dataArray)
                dispatch({
                    type: 'setTodos',
                    payload: {
                        todosPayload: newArray
                    }
                })
            }else {
                setNumTodos(0)
            }
        })
    },[username])

    function removeTodo(todo: todoType){
        setLoading(true)
        onValue(ref(db, `users/${username}/todos`), snapshot=>{
            if(snapshot.exists()){
                const data = snapshot.val()
                for(let key in data){
                    if(data[key].id === todo.id){
                        remove(ref(db, 'users/'+username+'/todos/'+key)).then(() => {
                            if (numTodos === 1) {
                                dispatch({
                                    type: 'setNoTodos'
                                })
                            }
                        })
                    }
                }
            }
        })
        setLoading(false)
    }
    
    function markTodoComplete(todo: todoType){
        setLoading(true)
        markCompleteInDB(todo, username)      
        setLoading(false)
    }
    
    return (
        <div className='overflow-y-scroll pt-4 h-[350px] mt-4 no-scrollbar'>
            {todos.length > 0 && todos.map(todo=>{
                return (
                    <div key={todo.id} className='min-h-[50px] bg-[#e8e4e4f2] rounded-md mb-2 p-2 flex items-center justify-between gap-2'>
                       <p className='text-gray-600 font-semibold '>{todo.name}</p> 
                       <div className='flex items-center gap-3'>
                            <button disabled={loading} onClick={()=>markTodoComplete(todo)} className='rounded-full text-green-500 border-[2px] border-green-500 w-[20px] h-[20px] flex items-center justify-center'>{todo.isComplete && <BsCheck />}</button>
                            <button disabled={loading} onClick={()=>removeTodo(todo)} className='text-red-500 text-[1.5rem]'><MdDeleteForever /></button>
                       </div>
                    </div>
                )
            })}
        </div>
    )
}
