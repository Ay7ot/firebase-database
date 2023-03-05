import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AppContext'
import { createUser } from '../Functions/functions'
import { useState } from 'react'
import {Navigate} from 'react-router-dom'

export default function Signup() {
    
    const {currentUser, username, password, email, dispatch, signUpError} = useAuth()
    
    console.log(username)
    const [loading, setLoading] = useState(false)
    
    async function handleSignUp(e: React.FormEvent<HTMLFormElement>){
       
        e.preventDefault()
        if(username === '' || password === '' || email === ''){
            return dispatch({
                type: 'setSignUpError',
                payload: {
                    signUpErrorPayload: 'Complete the form'
                }
            })
        }
        
        try{
            setLoading(true)
            await createUser(username, email, password)
        }catch{
            dispatch({
                type: 'setSignUpError',
                payload: {
                    signUpErrorPayload: 'Failed tp sign Up'
                }
            })
        }
        setLoading(false)
    }
    
    if(currentUser){
        return <Navigate to='/' />
    }
    
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='font-bold text-[2rem] mb-6 text-blue-400'>SIGN UP</h2>
            {signUpError !== '' && <p className='w-[300px] p-2 text-white bg-red-500'>{signUpError}</p>}
            <form className='flex flex-col gap-5' onSubmit={handleSignUp}>
                <input 
                    type='email'
                    value={email}
                    name='Email'
                    onChange={e => {
                       return dispatch({
                            type: 'setEmail',
                            payload: {
                                signUps:{
                                    emailPayload: e.target.value
                                }
                            }
                        })
                    }}
                    className='p-2 border-[2px] w-[300px] border-[#808080] focus:border-blue-400 outline-none'
                    placeholder='Email'
                />
                <input 
                    type='text'
                    value={username}
                    name='Username'
                    onChange={e => {
                        dispatch({
                            type: 'setUsername',
                            payload: {
                                signUps:{
                                    usernamePayload: e.target.value
                                }
                            }
                        })
                    }}
                    className='p-2 border-[2px] w-[300px] focus:border-blue-400 outline-none border-[#808080]'
                    placeholder='Username'
                />
                <input 
                    type='password'
                    value={password}
                    name='Password'
                    onChange={e => {
                        dispatch({
                            type: 'setPassword',
                            payload: {
                                signUps:{
                                    passwordPayload: e.target.value
                                }
                            }
                        })
                    }}
                    className='p-2 border-[2px] w-[300px] focus:border-blue-400 outline-none border-[#808080]'
                    placeholder='Password'
                />
                
                <button type='submit' className='text-white w-[300px] p-4 bg-blue-500 rounded-lg text-[1.3rem] font-bold tracking-wide'>Sign Up</button>
            </form>
            <p className='mt-6'>Already have an account? <Link to='/login' className='text-blue-400 '>Log In</Link></p>
        </div>
    )
}
