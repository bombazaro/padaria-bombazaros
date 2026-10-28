import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Inicio } from './pages/Inicio'
import { NaoEncontrada } from './pages/NaoEncontrada'
import { TrabalheConosco } from './pages/TrabalheConosco'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Inicio />} />
        <Route path="trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  )
}
