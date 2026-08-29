import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'

import './App.css'
import UsersPage from './pages/UsersPage'

function App() {

return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<LoginPage/>}/>
<<<<<<< Updated upstream
        <Route path="/search" element={<SearchPage/>}/>
=======
        <Route path="/callback" element={<CallBackPage/>}/>

        <Route path="/search" element={<SearchPage/>}/>

        <Route path='/users' element={<UsersPage/>}/>
>>>>>>> Stashed changes

      </Routes>
    </BrowserRouter>
  )
}

export default App
