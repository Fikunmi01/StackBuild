import { configureStore } from '@reduxjs/toolkit'
import postSlice from './features/post/postSlice';
import singleSlice from './features/post/singleSlice';
import commentSlice from './features/post/commentSlice';
import searchSlice from './features/searchSlice';

const store = configureStore({
    reducer: {
        post: postSlice,
        singlePost: singleSlice,
        comment: commentSlice,
        search: searchSlice,
    }
})

export default store;