import { Routes, Route } from 'react-router-dom'
import { Admin } from './Pages/Admin/Admin'
import { Client } from './Pages/Client/Client'
import { Login } from './Pages/Login/Login'
import { Register } from './Pages/Register/Register'
import "./assets/style.scss"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Client />}></Route>
        <Route path="/admin/*" element={<Admin />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  )
}

export default App
