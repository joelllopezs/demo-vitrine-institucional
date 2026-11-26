import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { isLogged } from '../lib/auth'
import AdminLayout from './admin/AdminLayout'
import Categories from './admin/Categories'
import Dashboard from './admin/Dashboard'
import GalleryAdmin from './admin/GalleryAdmin'
import InfoPage from './admin/InfoPage'
import Login from './admin/Login'
import Products from './admin/Products'

export default function Admin() {
  const [logged, setLogged] = useState(isLogged())
  if (!logged) return <Login onSuccess={() => setLogged(true)} />
  return (
    <Routes>
      <Route element={<AdminLayout onLogout={() => setLogged(false)} />}>
        <Route index element={<Dashboard />} />
        <Route path="produtos" element={<Products />} />
        <Route path="categorias" element={<Categories />} />
        <Route path="informacoes" element={<InfoPage />} />
        <Route path="galeria" element={<GalleryAdmin />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  )
}
