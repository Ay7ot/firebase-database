import Signup from './Components/Signup'
import { AppProvider } from './Contexts/AppContext'
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import Login from './Components/Login'
import ForgotPassword from './Components/ForgotPassword'

function App() {

  return (
    <div className="bg-slate-600">
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
