import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRouterAdmin = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const role = useSelector(state => state.auth.role);
        
    if(!isAuthenticated){
     return <Navigate to="/Login" /> 
    }else if(role !== 'Admin'){
      return <Navigate to="/" />
    }     
    return <Outlet />
  };