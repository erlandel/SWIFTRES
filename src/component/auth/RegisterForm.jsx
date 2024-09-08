import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'


import { useToggleShowPassword } from '../../actions/useToggleShowPassword';
import { handleKeyDownString } from '../../functionValidation/handleKeyDownString';
import { errorMessage } from '../messages/errorMessage';
import { correct } from '../messages/correct';
import { onKeyDownCI } from '../../functionValidation/onKeyDownCI';
import { ToastContainerMessage } from '../messages/ToastContainerMessage';
import axios from 'axios';





export const RegisterForm = () => {
  const navigate = useNavigate(); 
  const { showPassword, toggleShowPassword } = useToggleShowPassword();

  const [valueForm, setValueForm] = useState({
    Username: '',
    lastName: '',   
    email: '',
    CI:'',
    password: '',
    confirmPassword: '',
  });

  const [validationState, setValidationState] = useState({
    Username: null,
    lastName: null,    
    email: null,
    CI:null,
    password: null,
    confirmPassword: null,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValueForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateForm(name, value);
  };

  const validateForm = (name, value) => {
    let isValid = null;
    if(name === 'name'){
      isValid=value.length>=3;
     }else if(name === 'lastName'){
        const parts = value.split(' ');
        if (parts.length > 1) {
          isValid = parts[1].length >= 3;
        } else {
          isValid = false; 
        }
    }else if (name === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        isValid = emailRegex.test(value);
    }else if(name==='CI'){
        isValid=value.length===11;
    }else if (name === 'password') {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$#!%*?&]{8,16}$/;
        isValid = passwordRegex.test(value);
    } else if (name === 'confirmPassword') {
        isValid = value === valueForm.password;
    }else {     
        isValid = value.trim() !== '';
    }  

    setValidationState((prevState) => ({
      ...prevState,
      [name]: isValid,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let message;

    const isFormValid = Object.values(validationState).every((field) => field === true);
    
    if (!isFormValid) {        
        Object.entries(validationState).forEach(([key, value]) => {        
          if (value === null) {
            setValidationState(prevState => ({
             ...prevState, 
              [key]: false, 
            }));
          }
        });   

      message='Campos vacios o erróneos!';
      errorMessage(message);
      return; 
    }   

   
    
    
    const url='http://localhost:5167/api/User/Register';
   const data={
    Username: valueForm.Username,
    lastName: valueForm.lastName,   
    email: valueForm.email,
    CI:valueForm.CI,
    password: valueForm.password,
   }
   try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('respuesta'+response)

    if(response.status === 200){      
      correct('Confirmar correo al email!');  

      setTimeout(() => {
        navigate('/Login');
      }, 5000);  

    }else{
      errorMessage('Registro incorrecto!');
    }
   } catch (error) {
    console.log('Error : '+error)
   }
    
  
        
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-plane">
      <div className="card car-login mx-auto p-3 shadow-sm">
        
        <div className="text-center py-2">
          <i className="bi bi-person-circle mx-auto d-block mb-3 fs-1"></i>
          <h4 className="animate__animated animate__bounceIn">¡Registro!</h4>
          <p>Ingresa tus datos para registrarte.</p>
        </div>
        
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3 needs-validation">
            

              <div className="col-md-6 mb-2 position-relative">
                <input
                  type="text"
                  name="Username"
                  className={`form-control ${validationState.name === false ? 'is-invalid' : ''}`}
                  id="Username"
                  placeholder="Nombre"
                  required
                  value={valueForm.Username}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownString}
                />
                {validationState.name === false && (
                  <div className="invalid-tooltip">Por favor ingresa tu nombre.</div>
                )}
              </div>


              <div className="col-md-6 mb-2 position-relative">
                <input
                  type="text"
                  name="lastName"
                  className={`form-control ${validationState.lastName === false ? 'is-invalid' : ''}`}
                  id="lastName"
                  placeholder="Apellidos"
                  required
                  value={valueForm.lastName}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownString}
                />
                {validationState.lastName === false && (
                  <div className="invalid-tooltip">Por favor ingresa tus dos apellidos.</div>
                )}
              </div>
            

              <div className="col-md-6 mb-2 position-relative">
                <input
                  type="email"
                  name="email"
                  className={`form-control ${validationState.email === false ? 'is-invalid' : ''}`}
                  id="email"
                  placeholder="Correo electrónico"
                  required
                  value={valueForm.email}
                  onChange={handleInputChange}
                />
                {validationState.email === false && (
                  <div className="invalid-tooltip">Correo electrónico inválido.</div>
                )}
              </div>

                
              <div className="col-md-6 mb-2 position-relative">
                <input
                  type="CI"
                  name="CI"
                  className={`form-control ${validationState.CI === false ? 'is-invalid' : ''}`}
                  id="CI"
                  placeholder="Carne de identidad"
                  required
                  value={valueForm.CI}
                  onKeyDown={(event) => onKeyDownCI(event, valueForm)}
                  onChange={handleInputChange}
                />
                {validationState.CI === false && (
                  <div className="invalid-tooltip">Carnet de identidad inválido.</div>
                )}
              </div>


              <div className="col-md-6 mb-2 position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`form-control ${validationState.password === false ? 'is-invalid' : ''}`}
                  id="password"
                  placeholder="Contraseña"
                  required
                  value={valueForm.password}
                  onChange={handleInputChange}
                />
                {validationState.password === false && (
                  <div className="invalid-tooltip">
                    De 8 a 16 caracteres: mayúsculas, minúsculas, números y símbolos.
                  </div>
                )}
              </div>
              <div className="col-md-6 mb-2 position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={`form-control ${validationState.confirmPassword === false ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  placeholder="Confirmar contraseña"
                  required
                  value={valueForm.confirmPassword}
                  onChange={handleInputChange}
                />
                {validationState.confirmPassword === false && (
                  <div className="invalid-tooltip">Las contraseñas no coinciden.</div>
                )}
              </div>
              <div className="col-12 text-center">
                <div className="d-flex justify-content-start">
                  <div className="custom-checkbox">
                    <input type="checkbox" id="showPasswords" onChange={() => toggleShowPassword('password')} />
                    <label htmlFor="showPasswords">Mostrar contraseña</label>
                  </div>
                </div>
              </div>
              <div className="col-12 text-center">
                <div className="d-flex justify-content-between">
                  <Link to="/" className="cancelar">
                    <button type="button" className="btn btn-danger mr-2 btn-separation cancelar">
                      Cancelar
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-success iniciar-secion">
                    Registrarse
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>  
      <ToastContainerMessage /> 
          
    </div>
  );
};
