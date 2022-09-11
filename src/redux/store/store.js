import { configureStore } from '@reduxjs/toolkit'


import userReducer from '../slices/users/userSlice'
import expenseReducer from '../slices/expenses/expensesSlice'
import incomeReducer from '../slices/income/incomeSlice'


const store = configureStore({
    reducer: {
        users: userReducer,
        expenses: expenseReducer,
        income: incomeReducer
    },
})

export default store