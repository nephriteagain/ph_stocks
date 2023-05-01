import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import SingleStock from './pages/SingleStock'


function App() {
  

  
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/stocks/:symbol' element={<SingleStock />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
