import React, { useEffect, useState } from 'react'
import blogService from '../../services/blog';
import { useNavigate , Link , useParams} from 'react-router-dom';
import Container from '../Container/Container';
import Button from '../Button';
import parse from "html-react-parser";
import { deleteBlog } from '../../store/blogSlice';
import { useDispatch } from 'react-redux';
function Post() {
    console.log("in the post");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [post , setPost] = useState(null);
    const {id} = useParams();
    console.log(id);
    
    useEffect(()=>{
        const fetchPost = async()=>{
   if(id){
const post = await blogService.getPost({id});
console.log(post);

        if(post){
            setPost(post);
        }
        else{
            navigate('/');
        }
        }
        else{
            navigate('/')
        }

        }
        fetchPost();
    } ,[navigate , id]);
    const deletePost = async()=>{
        const delPost = await blogService.deletePost({id : post._id});
        if(delPost){
            // deleted
            dispatch(deleteBlog(delPost));
            navigate('/');
        }
    }
    // find the post with this id

  return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.url}
                        alt={post.title}
                        className="rounded-xl"
                    />

                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post._id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}

export default Post