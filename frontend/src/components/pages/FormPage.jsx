import React, { useState , useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../../services/blog';
import PostForm from '../PostForm';
import Container from '../Container/Container'; function FormPage() {
  const {id} = useParams();
  const [post , setPost] = useState(null);
  useEffect(() => {
    if(id){
        blogService.getPost({id})
            .then((post) => setPost(post));
    }
}, [id]);
if (id && !post) {
        return <div>Loading...</div>;
    }

    // find the post with this id
    // const dbPost =  await blogService.getPost({id}); cant do this sheeet
   
  return post ? (
<div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : (
 <div className='py-8'>
        <Container>
            <PostForm/>
        </Container>
    </div>
  )   
}
export default FormPage