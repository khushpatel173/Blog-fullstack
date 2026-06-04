import express from 'express'
import passport from 'passport';
import  User  from './models/User.js';
import localStrategy from 'passport-local'
import mongoose from 'mongoose';
import cors from 'cors'
import session from 'express-session';
import { Blog } from './models/Blog.js';
const app=express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionOptions = {
   
     secret: "SECRET_KEY",
        resave : false,
        saveUninitialized : false,
        cookie : {
            expires : Date.now() + 7 * 24 * 60 * 60 * 1000, // in ms
            //   expires : Date.now(), // in ms
            maxAge : 7 * 24 * 60 * 60 * 1000,
          
            httpOnly : true, // the cookie become unaccesseble to the java script
        }
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const PORT = 3000;
const dbUrl = 'mongodb://127.0.0.1:27017/blog'
app.listen(PORT , ()=>{
    console.log("Server is listening to port 3000");
});



main().then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})
async function main(){
   await mongoose.connect(dbUrl);
}


// authentication routess

app.post("/signup" , async(req ,res)=>{

    try {
          const {username , email , password} = req.body;
    let user = new User({
            email,
            username,
        });
    let registeredUser =  await User.register(user , password); // add the user to db
    req.login(registeredUser , (err)=>{
            if(err){
                 return res.status(500).json({
      success: false,
      message: err.message,
    });
            }

            // if there are no error
            res.status(201).json({
               success : true,
               message : "Sign up successfully" 
            })
    });
    } catch (error) {
         res.status(500).json({
    success: false,
    message: error.message,
  });
    } 
})

app.post("/login" , passport.authenticate("local") , (req ,res)=>{
    // if you are here that means you are logged in
    res.json({status : true});
});

app.post("/getUser", (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: "Not authenticated",
        });
    }

    res.json({
        success: true,
        user: req.user,
    });
});
app.post("/logout" ,(req ,res)=>{
    req.logout((err)=>{
        console.log(err);
    });
    res.json({message : "Logged out"});
})

// db related

app.post("/add" , async(req ,res)=>{

    try {
    const blog = new Blog(req.body);
    const newBlog = await blog.save();
   res.json(newBlog)
    } catch (error) {
        throw error
    }
})

app.post("/update" , async(req ,res)=>{
    try {
         const {id} = req.body;
    const blog = await Blog.findByIdAndUpdate(id, {
        ...req.body
    })
    res.json(blog);
    } catch (error) {
        throw error
    }

})
app.delete("/delete" , async(req ,res)=>{
    try {
    const {id} = req.body;
    const blog = await Blog.findByIdAndDelete(id);
    res.json(blog);
    } catch (error) {
        throw error
    }

})

app.post("/getPosts" , async(req ,res)=>{
    try {
    const posts = await Blog.find({});
    res.json(posts);  
    } catch (error) {
        throw error
    }
})

app.post('/findPost' , async(req, res)=>{
    try {
           const {id} = req.body;
    const dbPost = await Blog.findById(id);
    res.json(dbPost);
    } catch (error) {
        throw error;
    }
})
