import { configureStore } from '@reduxjs/toolkit'
import postSlice from './features/post/postSlice';
import singleSlice from './features/post/singleSlice';
import commentSlice from './features/post/commentSlice';
import searchSlice from './features/searchSlice';
import loginSlice from './features/user/loginSlice';
import accountSlice from './features/user/createSlice'
import updateSlice from './features/user/updateSlice';

const store = configureStore({
    reducer: {
        post: postSlice,
        singlePost: singleSlice,
        comment: commentSlice,
        search: searchSlice,
        user: loginSlice,
        create: accountSlice,
        update: updateSlice
    }
})

export default store;