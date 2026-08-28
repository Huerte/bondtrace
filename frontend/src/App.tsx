import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
import CallBackPage from './pages/CallbackPage'

import './App.css'

function App() {

return (
    <BrowserRouter>
      <Routes>
        
        {/* <Route path="/" element={<LoginPage/>}/> */}
        <Route path="/" element={<SearchPage/>}/>
        {/* <Route path="/callback" element={<CallBackPage/>}/> */}

      </Routes>
    </BrowserRouter>
  )
}

export default App
