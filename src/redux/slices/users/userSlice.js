import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


// Login Action
export const loginUserAction = createAsyncThunk('user/login', async (payload, {rejectWithValue, getState, dispatch}) => {
    // What we are sending to the server as JSON
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        // Make HTTP call
        const {data} = await axios.post('http://localhost:4500/v1/users/login', payload, config)
        return data
    } catch (error) {
        if(!error?.response) {
            throw error
        }

        return rejectWithValue(error?.repsonse?.data)
    }
})

// Slice
const userSlice = createSlice({
    name: 'users',
    initialState: {},
    extraReducers: (builder) => {
        // Handle Pending State
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true
            state.userAppErr = undefined
            state.userServerErr = undefined
        })
        // Handle Success State
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload
            state.userLoading = false
            state.userAppErr = undefined
            state.userServerErr = undefined
        })
        // Handle Rejected State
        builder.addCase(loginUserAction.rejected, (state,action) => {
            state.userLoading = false
            state.userAppErr = action?.payload?.message
            state.userServerErr = action?.error?.message
        })

    }
}) 


export default userSlice.reducer