import Signup from './Components/Signup'
import { AppProvider } from './Contexts/AppContext'
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import Login from './Components/Login'

function App() {

  return (
    <div className="">
      <AppProvider>
        <Router>
          <Routes>
            <Route path='/' element={<DashBoard />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </Router>
      </AppProvider>
    </div>
  )
}

export default App
