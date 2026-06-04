import { use, useState } from "react";
import Logo from "./Logo";
import { Link , useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form'
import { authService } from "../services/auth";
import blogService from "../services/blog";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import Input from "./Input";
import Button from "./Button";
function Login(){
    const {register , handleSubmit} = useForm();
    const [error , setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = async(data)=>{
        setError("");
        try {
            const res = await authService.login(data);
            if(res){
                // we are logged in 
                const userData = await authService.getCurrentUser();
                if(userData){
                    // then update the state
                    dispatch(authLogin(userData));
                    navigate("/")   
                }
            }
        } catch (error) {
             setError(error.message)
        }
    }

     return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                label="Username: "
                placeholder="Enter your username"
                type="text"
                {...register("username", {
                    required: true,
                })}
                // here we have not given ref because register does that otherwise we have to give it 
                />
                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full"
                >Sign in</Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login;