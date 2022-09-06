import { createAsyncThunk } from '@reduxjs/toolkit'
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