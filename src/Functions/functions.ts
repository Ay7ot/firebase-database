import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

export async function createUser(username: string, email: string, password: string){
    const reference = ref(db, 'users/' + username)
    
    set(reference, {
        usename: username,
        password: password
    })
    
    await createUserWithEmailAndPassword(auth, email, password)
}

export function loginUser(email: string, password: string){
    signInWithEmailAndPassword(auth, email, password)
}