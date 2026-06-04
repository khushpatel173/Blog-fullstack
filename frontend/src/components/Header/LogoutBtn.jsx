
import { authService } from "../../services/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
function LogoutBtn(){
        const dispatch = useDispatch();
        const navigate = useNavigate();
    const logoutHandler = async()=>{
        await authService.logout();
                // then to change the state run the login 
                dispatch(logout());
               
                
                navigate('/');
                //  we are logged out so navigate
    }
  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}
export default LogoutBtn;