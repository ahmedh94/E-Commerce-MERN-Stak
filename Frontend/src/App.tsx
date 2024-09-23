import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import Navbar from "./components/navbar"
import RegisterPage from "./pages/registerPage"
import AuthProvider from "./context/Auth/AuthProvider"
import LoginPage from "./pages/login"


function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter> 
    </AuthProvider>
  )
}

export default App
