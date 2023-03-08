import { onValue, ref, remove, set } from 'firebase/database'
import {useEffect, useState} from 'react'
import { useAuth } from '../Contexts/AppContext'
import { db } from '../firebase'
import { todoType } from '../Types/types'
import {BsCheckCircle} from 'react-icons/bs'
import {MdDeleteForever} from 'react-icons/md'

export default function Todos() {
    
    const { todos, dispatch, username } = useAuth()
    const [numTodos, setNumTodos] = useState(0)
    
    console.log(todos)
    
    useEffect(()=>{
        onValue(ref(db, `users/${username}/todos`), snapshot=>{
            const data = snapshot.val()
            if(data!== null){
                dispatch({
                    type: 'setNoTodos'
                })
                let dataArray = []
                for(let key in data){
                    let item = data[key]
                    dataArray.push(item)
                }
                setNumTodos(dataArray.length)
                dispatch({
                    type: 'setTodos',
                    payload: {
                        todosPayload: dataArray
                    }
                })
            }else {
                setNumTodos(0)
            }
        })
    },[])

    function removeTodo(todo: todoType){
        remove(ref(db, 'users/'+username+'/todos/'+todo.name)).then(() => {
            if (numTodos === 1) {
                dispatch({
                    type: 'setNoTodos'
                })
            }
        })
    }
    
    function markComplete(todo: todoType){
        const reference = ref(db, 'users/'+username+'/todos/'+todo.name)
        
        set(reference, {
            name: todo.name,
            isComplete: !todo.isComplete,
            id: todo.id
        })
    }
    
    return (
        <div className='overflow-y-scroll pt-4 h-[350px] mt-4 no-scrollbar'>
            {todos.length > 0 && todos.map(todo=>{
                return (
                    <div key={todo.id} className='h-[50px] bg-[#e8e4e4f2] rounded-md mb-2 p-2 flex items-center justify-between'>
                       <p className='text-gray-600 font-semibold '>{todo.name}</p> 
                       <div className='flex items-center gap-3'>
                            <i onClick={()=>markComplete(todo)} className='rounded-full text-green-500 border-[2px] border-green-500 w-[20px] h-[20px] flex items-center justify-center'>{todo.isComplete && <BsCheckCircle />}</i>
                            <i onClick={()=>removeTodo(todo)} className='text-red-500 text-[1.5rem]'><MdDeleteForever /></i>
                       </div>
                    </div>
                )
            })}
        </div>
    )
}
