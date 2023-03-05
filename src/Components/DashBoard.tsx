import { getAuth } from 'firebase/auth'
import { Navigate } from 'react-router-dom'

export default function DashBoard() {
    const { currentUser } = getAuth()
    console.log(currentUser)
    
    if(!currentUser){
        return <Navigate to='/login' />
    }
    
    return (
        <div>
            Dashboard
        </div>
    )
}
