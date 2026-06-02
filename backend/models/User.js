import mongoose, { modelNames } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";



const userSchema = new mongoose.Schema({
    email : {
        type : String , 
        required : true
    }
    // user and pass that passport will take
})

userSchema.plugin(passportLocalMongoose.default);

const User = mongoose.model("User" , userSchema);
export  default User;
