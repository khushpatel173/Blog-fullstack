import mongoose from "mongoose"

const blogSchema = new mongoose.Schema({
    // title, slug, content, featuredImage, status, userId
    title : {
        type : String , 
        required : true
    },
    content : {
        type : String , 
        required : true
    },
    url : {
        type : String
    },
});

const Blog = mongoose.model("Blog" , blogSchema);
export {Blog};