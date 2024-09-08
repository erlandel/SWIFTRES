import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useFrom';
import { useDispatch } from 'react-redux';


import { useToggleShowPassword } from '../../actions/useToggleShowPassword';
import { validatePassword } from '../../functionValidation/validatePassword';
import { validateEmail } from '../../functionValidation/validateEmail';
import { ToastContainerMessage } from '../messages/ToastContainerMessage';
import { errorMessage } from '../messages/errorMessage';
/* import { postData } from '../../hooks/usePostData'; */
import { correct } from '../messages/correct';
import { setLogin } from '../../slice/authSlice';
import '../../styles/login.css'
import axios from 'axios';



export const Login = () => {  

 const dispatch = useDispatch();

 const { showPassword, toggleShowPassword } = useToggleShowPassword();

 const [formValues, handleInputChange] = useForm({
    email: '',
    password:'' 
 });

 const { email, password } = formValues;
 
 const navigate = useNavigate(); 

 const handleLogin = async (e) => {
      e.preventDefault();  
      let message;
      
      if (!validateEmail(email)) {
        message='Correo inválido!';
        errorMessage(message);      
        return; 
      }

      if (!validatePassword(password)) {
        message='Contraseña inválida!';
        errorMessage(message);   
        return; 
      }       
        const url='http://localhost:5167/api/User/login';
        let dataObjects = { email, password };

        try {
        const response = await axios.post(url, dataObjects, {
          headers: {
            'Content-Type': 'application/json',
          },
        });      
      
        if (response.status === 200 ) {
          correct("Inicio de sesión exitoso!");
          const {role, isAuthenticated, token} = response.data;         
        
          localStorage.setItem('token', token);
 
          dispatch(setLogin({ email, role, isAuthenticated }));         
 
          setTimeout(() => {
            navigate("/");
          },500);
        } else {
           errorMessage("Credenciales inválidas!"); 
        } 
      
        
      } catch(error) {

        console.log(error)
      }     
     
 
 };

 return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-plane">
      <div className="card car-login mx-auto p-2 shadow-sm custom-max-width">
        <div className=" text-center">
          <i className="bi bi-person-circle mx-auto d-block mb-3 fs-1"></i>
          <h4 className='animate__animated animate__bounceIn'>¡Bienvenido!</h4>
          <p>Ingresa tus credenciales para continuar.</p>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">         
              <input
                type="email"
                name='email'
                className="form-control" 
                placeholder="Correo electrónico"
                value={email}
                onChange={handleInputChange}
              />
                
            </div>
            <div className="form-group position-relative">         
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                className="form-control mt-2"
                placeholder="Contraseña"
                value={password}
                onChange={handleInputChange}
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-3"
                onClick={() => toggleShowPassword('password')}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
              </span>
            </div>
              
          </form>  
        </div>
        <div className=" text-center">
          <div className="d-flex justify-content-between">
            <Link to="/" className="cancelar">
              <button className="btn btn-danger mr-2 btn-separation cancelar">Cancelar</button>
            </Link>
            <button className="btn btn-success iniciar-secion" onClick={handleLogin}>Iniciar sesión</button>
          </div>
          <p className="mt-3 d-flex justify-content-between">
            <Link to="/RecoverPassword" className="text-primary text-decoration-none link1">¿Olvidaste tu contraseña?</Link>
            <Link to="/RegisterForm" className="text-primary text-decoration-none link2">Registrarse</Link>
          </p>
        </div>
      </div>
      <ToastContainerMessage/>
    </div>
 );
}
