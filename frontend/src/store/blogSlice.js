import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs : [],
}

const blogSlice = createSlice({
    name : 'blog' , 
    initialState , 
    reducers : {
        add : (state , action)=>{
            state.blogs.push(action.payload);
        } , 
        update : (state , action) =>{
            //  action me we assume ki nayi vali blog mila he 
            state.blogs = state.blogs.map((blog)=> (
                blog._id === action.payload._id ? action.payload : blog
            ));
        },
        deleteBlog : (state , action)=>{
            // assume we are passing the whole blog
            state.blogs = state.blogs.filter((blog) => blog._id !== action.payload._id)
        }
    }
})

export default blogSlice.reducer;
export const {add , update,deleteBlog} = blogSlice.actions