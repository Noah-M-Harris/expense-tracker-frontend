import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';

import Login from './pages/Users/Login/Login'
import Register from './pages/Users/Register/Register'

import AddIncome from './pages/Income/AddIncome'
import IncomeList from './pages/Income/IncomeList'

import AddExpense from './pages/Expenses/AddExpense'
import ExpensesList from './pages/Expenses/ExpensesList'

import ProtectedRoute from './components/Navigation/ProtectedRoute';

import Profile from './pages/Users/Profile/Profile'
import ProtectedRoute from './components/Navigation/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />

        <Route element={<ProtectedRoute />} >
          <Route exact path='/add-income' element={<AddIncome />} />
          <Route exact path='/add-expense' element={<AddExpense />} />
          <Route exact path='/profile' element={<Profile />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
