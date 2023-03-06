import { ref, set } from "firebase/database";
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

export function createTodo(username: string, todo: todoType){
    const reference = ref(db, '/users' + username + '/todos')
    
    set(reference, {
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

export function logout(){
    signOut(auth)
}