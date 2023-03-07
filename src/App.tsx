import Signup from './Components/Signup'
import { AppProvider } from './Contexts/AppContext'
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import Login from './Components/Login'
import ForgotPassword from './Components/ForgotPassword'

function App() {

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
