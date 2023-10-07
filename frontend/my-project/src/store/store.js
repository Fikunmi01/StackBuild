import { configureStore } from '@reduxjs/toolkit'
import postReducer from './postreducer'

const store = configureStore({
    reducer: {
        post: postReducer
    }
})