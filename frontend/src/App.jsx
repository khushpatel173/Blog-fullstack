import { useState } from 'react'

import './App.css'
import { authService } from './services/auth'
function App() {

const [isLoggedIn , setIsLoggedIn] = useState(false);
  return (
    <>
   <button onClick={async()=>{
    const res = await authService.signup({username : "demo" , email: "demo@gmail.com" , password : "demo"});

    if(res){
      setIsLoggedIn(true);
    }
   }}>Sign up</button>

   <button onClick={()=>{
    if(isLoggedIn){
      authService.logout();
      setIsLoggedIn(false);
    }
   }}> Logout </button>


   <button onClick={async()=>{
      if(!isLoggedIn){
      const res = await authService.login({username : "demo" , password : "demo"});
      console.log(res);
      if(res){
        setIsLoggedIn(true);
      }
      }
     
   }}>Login</button>


   <button
   onClick={async()=>{
    const res = await authService.getCurrentUser();
   }}
   >
    GetUser
   </button>
   {isLoggedIn ? (<p>Logged in</p>) : null}
    </>
  )
}

export default App
