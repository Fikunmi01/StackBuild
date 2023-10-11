import { configureStore } from '@reduxjs/toolkit'
// import rootReducer from './store/rootreducer';
import postSlice from './features/post/postSlice';
import singleSlice from './features/post/singleSlice';
import commentSlice from './features/post/commentSlice';

const store = configureStore({
    reducer: {
        post: postSlice,
        singlePost: singleSlice,
        comment: commentSlice
    }
})

export default store;