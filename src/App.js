import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';

import Login from './pages/Users/Login/Login'
import Register from './pages/Users/Register/Register'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
