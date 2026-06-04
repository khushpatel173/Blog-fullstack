import axios from "axios";


class BlogService{
    // createPost , deletePost , updatePost ,getPosts
    async createPost({title , content , url}){
        try {
        const res = await axios.post("http://localhost:3000/add" , {title , content , url}); 
        return res.data;
        } catch (error) {
           throw error; 
        }
    }

    async updatePost({title , content , url , id}){
         try {
        const res = await axios.post(`http://localhost:3000/update` , {title , content , url , id}); 
        return res.data;
        } catch (error) {
           throw error; 
        }
    }
     async deletePost({id}){
         try {
        const res = await axios.delete("http://localhost:3000/delete" , {
            data : {id}
        }); 
        return res.data;
        } catch (error) {
           throw error; 
        }
    }
    async getPosts(){
        try {
           const posts = await axios.post("http://localhost:3000/getPosts");
        return posts.data;  
        } catch (error) {
            throw error;
        }
    }
    async getPost({id}){
        try {
            const post = await axios.post("http://localhost:3000/findPost" , {id});
            return post.data;
        } catch (error) {
            throw error;
        }
    }
}

const blogService = new BlogService;
export default blogService;