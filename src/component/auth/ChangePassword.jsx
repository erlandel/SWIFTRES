import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useToggleShowPassword } from '../../actions/useToggleShowPassword';
import { errorMessage } from '../messages/errorMessage';
import { ToastContainerMessage } from '../messages/ToastContainerMessage';
import { correct } from '../messages/correct';
import '../../styles/login.css';

export const ChangePassword = () => {

  const navigate = useNavigate();
 

  const { showPassword, toggleShowPassword } = useToggleShowPassword();

  const [validationState, setValidationState] = useState({
    password: null,
    confirmPassword: null,
  });

  const [valueForm, setValueForm] = useState({
    password: '',
    confirmPassword: '',
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
    if (name === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$#!%*?&]{8,16}$/;
      isValid = passwordRegex.test(value);
    } else if (name === 'confirmPassword') {
      isValid = value === valueForm.password;
    } else {
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
      message='Campos vacíos o erróneos!';
      errorMessage(message);
      return; 
    }    

    const url = "http://localhost:5167/api/User/ChangePassword";
    const password=valueForm.password;
    const email=localStorage.getItem('email');
    const dataObjects = { password,email};

 

   try {
    const response = await axios.patch(url, dataObjects, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(response.status === 200){
      correct('Cambio de contraseña exitoso!')
      setTimeout(() => {
        navigate('/Login');
      }, 500);      
    }else{
      errorMessage('Error al actualizar!');
    }
    
   } catch (error) {
    console.log(error);
   }
    
      
  };


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-plane">
      <div className="card car-login mx-auto p-2 shadow-sm custom-max-width">
        <div className="text-center">
          <i className="bi bi-person-circle mx-auto d-block mb-3 fs-1"></i>
          <h4 className="animate__animated animate__bounceIn">¡Cambiar contraseña!</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>
            <div className="d-flex flex-column"> {/* Contenedor para alinear los inputs y el componente "Mostrar contraseña" */}
              <div className="col-12 mb-2 position-relative">
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
              <div className="col-12 mb-2 position-relative">
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
            </div>
            <div className="col-12 text-left mt-2"> {/* Nuevo div para alinear el checkbox */}
              <div className="custom-checkbox">
                <input type="checkbox" id="showPasswords" onChange={() => toggleShowPassword('password')} />
                <label htmlFor="showPasswords">Mostrar contraseña</label>
              </div>
            </div>
            <div className="text-center">
              <div className="d-flex justify-content-between">
                <Link to="/" className="cancelar">
                  <button className="btn btn-danger mr-2 btn-separation cancelar">Cancelar</button>
                </Link>
                <button type="submit" className="btn btn-success iniciar-secion">Confirmar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainerMessage/>
    </div>
  );
};
