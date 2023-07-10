import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {Url} from '../../util/rutas'
const URL_LOGIN=Url('group/forOne')

export const get_group= createAsyncThunk('posts/get_group',async(idGroup)=>{
    try{
        if(idGroup.idGroup!==null){
            const response= await fetch(URL_LOGIN,{
            body:JSON.stringify(idGroup),
            method:'post',
            headers:{"Content-Type":"application/json","Accept-Encoding":"gzip, deflate, br","Accept":"*/*"}
        });
        const data= await response.json()
        return data
        }
        const response= await fetch(URL_LOGIN,{
            body:JSON.stringify(idGroup),
            method:'post',
            headers:{"Content-Type":"application/json","Accept-Encoding":"gzip, deflate, br","Accept":"*/*"}
        });
        const data= await response.json()
        return data
    }
    catch(error){
        console.log("soyel error **********************",error)
    }

})

export const groupSlice=createSlice({
    name:'group',
    initialState:{
        group:{
            members:null
        },
        loading:false
    },
 
    
    extraReducers:{
        [get_group.pending]: (state)=>{
            console.log('pending')
            state.loading=true
        },
        [get_group.fulfilled]: (state,{payload})=>{
            state.group.members=payload
     
            state.loading=false;
        },
        [get_group.rejected]: (state,action)=>{
            state.loading=false;
        },
    }

})


export default groupSlice.reducer