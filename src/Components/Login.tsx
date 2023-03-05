import { Link } from 'react-router-dom'
import { useAuth } from '../Contexts/AppContext'
import { createUser, loginUser } from '../Functions/functions'

export default function Login() {
    
    const {username, password, email} = useAuth()
    
    function handleLogin(e: React.FormEvent<HTMLFormElement>){
        if(username === '' || password === '' || email === ''){
            return 
        }
        
        try{
            loginUser(email, password)
        }catch{
            
        }
    }
    
    return (
        <div className='min-h-screen flex flex-col justify-center items-center'>
            <h2 className='font-bold text-[2rem] mb-6 text-blue-400'>LOG IN</h2>
            <form className='flex flex-col gap-5' onSubmit={handleLogin}>
                <input 
                    type='email'
                    onChange={e => {
                        
                    }}
                    className='p-2 border-[2px] w-[300px] border-[#808080] focus:border-blue-400 outline-none'
                    placeholder='Email'
                />
                <input 
                    type='password'
                    onChange={e => {
                        
                    }}
                    className='p-2 border-[2px] w-[300px] focus:border-blue-400 outline-none border-[#808080]'
                    placeholder='Password'
                />
                
                <button className='text-white w-[300px] p-4 bg-blue-400 rounded-lg text-[1.3rem] font-bold tracking-wide'>Login</button>
            </form>
            <p className='mt-6'>Need an account? <Link to='/signup' className='text-blue-400 '>Sign Up</Link></p>
        </div>
    )
}
