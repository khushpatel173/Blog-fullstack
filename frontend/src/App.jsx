import { useEffect, useState } from 'react'
import './App.css'
import { authService } from './services/auth'
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login , logout } from './store/authSlice.js';
function App() {
  const [loading , setLoading] = useState(true);
  const dispatch = useDispatch();
useEffect(()=>{
  // get the userData and checked if it is logged in or not
  authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login(userData));
      }
      else{
        dispatch(logout())
      }
  })
  .finally(()=> setLoading(false))
},[])
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
         <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}

export default App

// const [isLoggedIn , setIsLoggedIn] = useState(false);
//   return (
//     <>
//    <button onClick={async()=>{
//     const res = await authService.signup({username : "demo" , email: "demo@gmail.com" , password : "demo"});

//     if(res){
//       setIsLoggedIn(true);
//     }
//    }}>Sign up</button>

//    <button onClick={()=>{
//     if(isLoggedIn){
//       authService.logout();
//       setIsLoggedIn(false);
//     }
//    }}> Logout </button>


//    <button onClick={async()=>{
//       if(!isLoggedIn){
//       const res = await authService.login({username : "demo" , password : "demo"});
//       console.log(res);
//       if(res){
//         setIsLoggedIn(true);
//       }
//       }
     
//    }}>Login</button>


//    <button
//    onClick={async()=>{
//     const res = await authService.getCurrentUser();
//    }}
//    >
//     GetUser
//    </button>
//    {isLoggedIn ? (<p>Logged in</p>) : null}
//     </>
//   )