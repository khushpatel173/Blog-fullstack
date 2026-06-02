class BlogService{
    // createPost , deletePost , updatePost ,getPosts
    async createPost({title , content , url}){
        try {
        const res = await axios.post("/add" , {title , content , url}); 
        return res.data;
        } catch (error) {
           throw error; 
        }
    }

    async updatePost({title , content , url}){
         try {
        const res = await axios.post("/:id" , {title , content , url}); 
        return res.data;
        } catch (error) {
           throw error; 
        }
    }
     async deletePost({title , content , url}){
         try {
        const res = await axios.delete("/:id" , {title , content , url}); 
        return res.data;
        } catch (error) {
           throw error; 
        }
    }
    async getPosts(){
        try {
           const posts = await axios.post("/getPosts");
        return posts.data;  
        } catch (error) {
            throw error;
        }
    }
}

const blogService = new BlogService;
export default blogService;