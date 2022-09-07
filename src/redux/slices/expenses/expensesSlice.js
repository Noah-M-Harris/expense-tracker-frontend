import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import expensesBaseURL from '../../../utils/baseURL'



// Create Expense Action
export const createExpenseAction = createAsyncThunk('expense/create', async (payload, {rejectWithValue, getState, dispatch}) => {
    
    // Retrieve user token from store
    const user = getState()?.users?.userAuth?.token

    // What we are sending to the server as JSON
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user}`
        }
    }
    try {
        // Make HTTP call
        const {data} = await axios.post(expensesBaseURL + '/', payload, config)
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


// View Expense Reports (fetchAll) Action
export const fetchAllExpenses = createAsyncThunk('expense/fetch', async (payload, {rejectWithValue, getState, dispatch}) => {
    
    // Retrieve user token from store
    const user = getState()?.users?.userAuth?.token

    // What we are sending to the server as JSON
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user}`
        }
    }
    try {
        // Make HTTP call
        const {data} = await axios.get(expensesBaseURL + `/?page=${payload}`, config)
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})


const expenseSlice = createSlice({
    name: 'expenses',
    initialState: {

    },
    extraReducers: (builder) => {
        // Create Expense
        builder.addCase(createExpenseAction.pending, (state, action) => {
            state.isLoading = true
        })
        builder.addCase(createExpenseAction.fulfilled, (state, action) => {
            state.isLoading = false
            state.expenseCreated = action?.payload
            state.appErr = undefined
            state.ServerErr = undefined
        })
        builder.addCase(createExpenseAction.rejected, (state,action) => {
            state.isLoading = false
            state.appErr = action?.payload?.message
            state.ServerErr = action?.payload?.message
        })
        // Fetch All Expenses
        builder.addCase(fetchAllExpenses.pending, (state, action) => {
            state.expLoading = true
        })
        builder.addCase(fetchAllExpenses.fulfilled, (state, action) => {
            state.expLoading = false
            state.expenseList = action?.payload
            state.expAppErr = undefined
            state.expServerErr = undefined
        })
        builder.addCase(fetchAllExpenses.rejected, (state,action) => {
            state.expLoading = false
            state.expAppErr = action?.payload?.message
            state.expServerErr = action?.payload?.message
        })
    }
})


export default expenseSlice.reducer