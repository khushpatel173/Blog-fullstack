// login related servicesss
// we make class and objects generally in this kind of things

import axios from 'axios';

class AuthService {
    async signup({username , email , password}){
       const res =  await axios.post("http://localhost:3000/signup" , {username , email , password} , {
            withCredentials : true
        });   
        return res.data.success;
    }

    async login({username , password}){
        try {
            const res = await axios.post("http://localhost:3000/login" , {username , password}, {withCredentials : true});
            return res.data;
        } catch (error) {
            // failed to login then redirect to /login
                console.log(error);
        }
    }

     async getCurrentUser() {
        try {
            const res =  await axios.post("http://localhost:3000/getUser" ,{} ,{withCredentials: true});
            return res.data;
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }
        return null;
    }

    async logout(){
        try {
             await axios.post("http://localhost:3000/logout" , {
                withCredentials : true
             });
        } catch (error) {
            throw error
        }
       
    }
}

const authService = new AuthService;
export {authService};
