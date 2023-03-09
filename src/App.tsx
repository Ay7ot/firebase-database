import { AppProvider } from './Contexts/AppContext'
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import ForgotPassword from './Components/ForgotPassword'
import { useEffect, useState } from 'react'
import Loader from './Components/Loader'
import DashBoard from './Components/DashBoard'
import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {
  
  const [areComponentLoaded, setAreComponentLoaded] = useState(false)
  
  useEffect(()=>{
    Promise.all([
      import('./Components/Signup'),
      import('./Components/Login'),
      import('./Components/DashBoard'),
    ]).then(()=>{
      setAreComponentLoaded(true)
    })
  },[])
  
  if(!areComponentLoaded){
    return <Loader />
  }
  
  return (
    <div className="bg-[#222e50] font-inter min-h-screen">
      <AppProvider>
        <Router>
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  )
}

export default App
