import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { validateEmail } from '../../functionValidation/validateEmail';
import { ToastContainerMessage } from '../messages/ToastContainerMessage';
import { errorMessage } from '../messages/errorMessage';
import axios from 'axios';

export const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();  

  const handleEmail = async (e) => {
    e.preventDefault();
    let message;
  
    if (!validateEmail(email)) {
      message = 'Correo inválido!';
      errorMessage(message);
      return;
    }

    const url='http://localhost:5167/api/User/ChangePassword';
     const object={
      email
     }
 

   try {
    const response = await axios.post(url, object, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(response.status === 200){
      localStorage.setItem('email',email);
      navigate('/CodePassword');
    }else{
      errorMessage('Correo no encontrado!');
    }     

   } catch (error) {
    console.log(error);
   }  
   
  };
  

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-plane">
      <div className="card car-login mx-auto p-2 shadow-sm custom-max-width">
        <div className="text-center">
          <i className="bi bi-person-circle mx-auto d-block mb-3 fs-1"></i>
          <h4 className="animate__animated animate__bounceIn">¡Recuperar contraseña!</h4>
        </div>
        <div className="card-body">
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={email}
              className="form-control"
              placeholder="Correo electrónico"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="text-center">
          <div className="d-flex justify-content-between">
            <Link to="/Login" className="cancelar">
              <button className="btn btn-danger mr-2 btn-separation cancelar">Atras</button>
            </Link>

            <Link to="/CodePassword" className="cancelar">
              <button className="btn btn-success iniciar-secion" onClick={handleEmail}>Siguiente</button>
            </Link>
          </div>
        </div>
      </div> 
      <ToastContainerMessage />  
        </div>   
    
  );
};
