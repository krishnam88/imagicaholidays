import { Routes, Route } from 'react-router-dom'

// Pages (created as stubs; full implementation follows in later phases)
import Home from './pages/Home.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}
