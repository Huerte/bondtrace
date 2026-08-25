import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'

import './App.css'

function App() {

return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/search" element={<SearchPage/>}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
