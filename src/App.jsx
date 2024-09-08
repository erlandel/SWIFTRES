import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./slice/authSlice";


export const App = () => {
    const dispatch=useDispatch();  

    useEffect(() => {     

        const auth = async () => {
          try {
            
            const token = localStorage.getItem('token');
            console.log('token: '+ token)

            if(token!==null){                
              const response = await fetch("http://localhost:5167/api/User/Autenticate", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  token: token,
                }),
              });      
             
               if (response.status === 200) {
                      localStorage.setItem(response.data.token);
                    } else {
                        dispatch(logout());
                    }        
            }
           let value = localStorage.getItem('value');
           value +=1;
           localStorage.setItem('value',value);

          } catch (error) {
            console.log(error);
          }
        };
    
        auth();
      }, []);
}
