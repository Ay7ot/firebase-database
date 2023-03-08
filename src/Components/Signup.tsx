import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AppContext'
import { createUser } from '../Functions/functions'
import { useState, useEffect } from 'react'
import {Navigate} from 'react-router-dom'
import Loader from './Loader'

export default function Signup() {
    
    const {currentUser, username, password, email, dispatch, signUpError} = useAuth()

    const [loading, setLoading] = useState(false)
    
    useEffect(()=>{
        dispatch({
            type: 'setNoParameter'
        })
    },[])
    
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
                    signUpErrorPayload: 'Failed to sign Up'
                }
            })
        }
        setLoading(false)
    }
    
    if(currentUser){
        return <Navigate to='/' />
    }
    
    if(loading){
        return <Loader />
    }
    
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='font-bold text-[2rem] mb-6 text-blue-400'>SIGN UP</h2>
            {signUpError !== '' && <p className='w-[300px] p-2 text-white bg-red-400 mb-6'>{signUpError}</p>}
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
                    className='p-2 border-[2px] w-[300px] border-[#808080] focus:border-blue-400 outline-none rounded-md'
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
                    className='p-2 border-[2px] w-[300px] focus:border-blue-400 outline-none border-[#808080] rounded-md'
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
                    className='p-2 border-[2px] w-[300px] focus:border-blue-400 outline-none border-[#808080] rounded-md'
                    placeholder='Password'
                />
                
                <button disabled={loading } type='submit' className='text-white w-[300px] p-4 bg-blue-500 rounded-lg text-[1.3rem] font-bold tracking-wide'>Sign Up</button>
            </form>
            <p className='mt-6 text-white'>Already have an account? <Link to='/login' className='text-blue-400 '>Log In</Link></p>
        </div>
    )
}
