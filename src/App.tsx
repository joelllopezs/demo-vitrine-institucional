import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Toaster from './components/Toaster'
import Admin from './pages/Admin'
import Site from './pages/Site'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollTop />
      <Routes>
        <Route path="/" element={<Site />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="*" element={<Site />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}
