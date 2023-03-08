import { ref, set, push, update, onValue } from "firebase/database";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { todoType } from "../Types/types";

export async function createUser(username: string, email: string, password: string){
    const reference = ref(db, 'users/' + username)
    
    set(reference, {
        username: username,
        password: password,
        email: email
    })
    
    await createUserWithEmailAndPassword(auth, email, password)
}

export async function createTodo(username: string, todo: todoType){
    const reference = ref(db, 'users/' + username + '/todos/')
    
    const newReference = push(reference)
    
    set(newReference, {
        name: todo.name,
        id: todo.id,
        isComplete: todo.isComplete
    })
}

export async function loginUser(email: string, password: string){
    await signInWithEmailAndPassword(auth, email, password)
}

export async function forgotPassword(email: string){
    await sendPasswordResetEmail(auth, email)
}

export function rearrangeArrayFromBack(arr: todoType[]) {
    const newArray = [];
    const completedTodos = [];
  
    for (let i = arr.length - 1; i >= 0; i--) {
      const item = arr[i];
  
      if (item.isComplete) {
        completedTodos.push(item);
      } else {
        newArray.push(item);
      }
    }
  
    return newArray.concat(completedTodos);
  }

export function logout(){
    signOut(auth)
}

export function markCompleteInDB(todo: todoType, username: string){
    let newKey = ''
    onValue(ref(db, 'users/'+username+'/todos'), snapshot=>{
        const data = snapshot.val()
        for(let key in data){
            if(data[key].id === todo.id){
               newKey = key 
            }
        }
    })
    update(ref(db, 'users/'+username+'/todos/'+newKey),{
        name: todo.name,
        id: todo.id,
        isComplete: !todo.isComplete
    })
}