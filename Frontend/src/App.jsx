import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import UserSignup from './pages/UserSignup'
import UserLogin from './pages/UserLogin'
import { UserContextData } from './context/userContext'

const App = () => {
const ans = useContext(UserContextData)
// console.log(ans);

  return (
   <div>
    <Routes>
      <Route path="/" element={<Start />} />
      <Route path="/captain-signup" element={<CaptainSignup />} />
      <Route path="/captain-login" element={<CaptainLogin />} />
      <Route path="/signup" element={<UserSignup />} />
      <Route path="/login" element={<UserLogin />} />
    </Routes>
   </div>
  )
}

export default App