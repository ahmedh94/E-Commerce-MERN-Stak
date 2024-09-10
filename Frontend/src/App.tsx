import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home"
import Navbar from "./components/navbar"
import RegisterPage from "./pages/registerPage"


function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
