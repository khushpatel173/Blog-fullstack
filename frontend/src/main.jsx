import ReactDOM from 'react-dom/client'
import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import Home from './components/pages/Home.jsx'
import Login from './components/Login.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Signup from './components/Signup.jsx'
import FormPage from './components/pages/FormPage.jsx'
import Post from './components/pages/Post.jsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <FormPage/>
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:id",
            element: (
                <AuthLayout authentication>
                    {" "}
                   <FormPage/>
                </AuthLayout>
            ),
        },
        {
            path: "/post/:id",
            element: <Post/>,
        },
    ],
},
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
