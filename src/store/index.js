import {configureStore} from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice'
import groupReducer from './slices/groupSlice';
const store = configureStore({
    reducer:{
        login:loginReducer,
        group:groupReducer
    },
});

store.subscribe(()=>console.log(store))

export default store;