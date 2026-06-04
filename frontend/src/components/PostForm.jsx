import React from 'react'
import Input from './Input';
import RTE from './RTE';
import Button from './Button';
import { useForm } from 'react-hook-form';
import blogService from '../services/blog';
 import { useNavigate } from 'react-router-dom';
 import axios from 'axios';
 import {add , update , deleteBlog} from '../store/blogSlice';
 import { useDispatch } from 'react-redux';
function PostForm({post}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
const {register , handleSubmit , control , getValues} = useForm({
    defaultValues : {
        title : post?.title || '',
        content : post?.content || '',
        url : post?.url || ''
    }
})

const submit = async(data)=>{
    // in data we will get title , content , and url
    if(post){
        // that means you are updating
        const dbPost = await blogService.updatePost({...data , id : post._id});
         if (dbPost) {
            // that means we have updated so update in the state as well
            dispatch(update(dbPost));
                navigate(`/post/${dbPost._id}`);
            }
    }
    else{
        // that means we need to create a new post
        const dbPost = await blogService.createPost({...data});
        console.log('here');
        
        if(dbPost){
            // created
            dispatch(add(dbPost));
            navigate(`/post/${dbPost._id}`);
        }
    }
}
   return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
              
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label=" Image Url:"
                    type="text"
                    className="mb-4"
                    {...register("url", { required: !post })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm