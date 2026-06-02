import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs : [],
}

const blogSlice = createSlice({
    name : 'blog' , 
    initialState , 
    reducers : {
        add : (state , action)=>{
            state.blogs.push(action.payload.blog);
        } , 
        update : (state , action) =>{
            //  action me we assume ki nayi vali blog mila he 
            state.blogs = blogs.map((blog)=> (
                blog._id === action.payload._id ? action.payload : blog
            ));
        },
        delete : (state , action)=>{
            // assume we are passing the whole blog
        }
    }
})