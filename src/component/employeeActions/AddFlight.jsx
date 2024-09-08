import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom';

import { errorMessage } from '../messages/errorMessage';
import { correct } from '../messages/correct';
import { handleKeyDownString } from '../../functionValidation/handleKeyDownString';
import { handleKeyDownNumber } from '../../functionValidation/handleKeyDownNumber';
import{ToastContainerMessage} from '../messages/ToastContainerMessage'
import axios from 'axios';
import { useSelector } from 'react-redux';

export const AddFlight = () => {

  const email=useSelector(state=>state.auth.email)
  const navegate = useNavigate();
 


  const [valueForm, setValueForm] = useState({   
    origin: '',
    destinity: '',
    dateTime: '',
    departureTime: '',
    arriveTime: '',
    price: '',   
    capacity: '',
  });

  const [validationState, setValidationState] = useState({
    origin: true,
    destinity: true,   
    dateTime: true,
    departureTime:true,
    arriveTime: true,
    price: true,  
    capacity: true,
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
  if(name === 'origin' || name === 'destination') {
    isValid=value.length>=3;
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

    errorMessage('Campos vacios o erróneos!');
    return; 
  }   
  
  const url = `http://localhost:5167/api/Flight/CreateFlight`;    


  const Flig={
    adminEmail: email,
    origin: valueForm.origin,
    destinity: valueForm.destination,
    capacity: valueForm.capacity,
    dateTime: valueForm.date,
    departureTime: valueForm.departureTime,
    arriveTime: valueForm.arrivalTime,
    price: valueForm.price
  }

  const response = await axios.post(url,Flig,{
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  }); 


  if(response.status === 200){   
    correct('Vuelo agregado con exito!'); 
    setTimeout(() => {      
      navegate('/Employee/FlightCard') 
    }, 5000);
  }else{   
    errorMessage('Error al agregar vuelo!');
  }    
};


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-plane">
      <div className='card car-login mx-auto p-3 shadow-sm overflow-hidden'>

          <div className=" text-center py-2">
          <i className="fas fa-plane mx-auto d-block mb-3 fs-1 text-dark"></i>
            <h4 className="animate__animated animate__bounceIn">¡Agregar Vuelo!</h4>           
          </div>

        <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='row g-3 needs-validation'>
                
              <div className="col-md-6 mb-2 position-relative">
              <label htmlFor="origin">Origen:</label>
                <input
                  type="text"
                  name="origin"
                  className={`form-control ${validationState.origin === false ? 'is-invalid' : ''}`}
                  id="origin"
                  placeholder="----------"                  
                  required
                  value={valueForm.origin}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownString}
                />              
              </div>

              <div className="col-md-6 mb-2 position-relative">
              <label htmlFor="destination">Destino:</label>
                <input
                  type="text"
                  name="destination"
                  className={`form-control ${validationState.destination === false ? 'is-invalid' : ''}`}
                  id="destination"
                  placeholder="----------"
                  required
                  value={valueForm.destination}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownString}
                />              
              </div>

              <div className="col-md-6 mb-2 position-relative">
              <label htmlFor="date">Fecha:</label>
                <input
                  type="date"
                  name="date"
                  className={`form-control ${validationState.date === false ? 'is-invalid' : ''}`}
                  id="date"
                  placeholder="Fecha"
                  required
                  value={valueForm.date}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownString}
                />              
              </div>
              
              <div className="col-md-6 mb-2 position-relative">
              <label htmlFor="price">Precio:</label>
                <input
                  type="text"
                  name="price"
                  className={`form-control ${validationState.price === false ? 'is-invalid' : ''}`}
                  id="price"
                  placeholder="----------"
                  required
                  value={valueForm.price}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownNumber}
                />              
              </div>
              
              <div className="col-md-6 mb-2 position-relative">
              <label htmlFor="departureTime">Hora de salida:</label>
                <input
                  type="time"
                  name="departureTime"
                  className={`form-control ${validationState.name === false ? 'is-invalid' : ''}`}
                  id="departureTime"
                  placeholder="----------"
                  required
                  value={valueForm.departureTime}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownString}
                />              
              </div>

              
              <div className="col-md-6 mb-2 position-relative">
              <label htmlFor="arrivalTime">Hora de llegada:</label>
                <input
                  type="time"
                  name="arrivalTime"
                  className={`form-control ${validationState.arrivalTime === false ? 'is-invalid' : ''}`}
                  id="arrivalTime"
                  placeholder="----------"
                  required
                  value={valueForm.arrivalTime}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownString}
                />              
              </div>


              <div className="col-md-6 mb-2 position-relative">
              <label htmlFor="capacity">Capacidad:</label>
                <input
                  type="text"
                  name="capacity"
                  className={`form-control ${validationState.capacity === false ? 'is-invalid' : ''}`}
                  id="capacity"
                  placeholder="----------"
                  required
                  value={valueForm.capacity}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDownNumber}
                />              
              </div>           

            </div>

            <div className="col-12 text-center">
                <div className="d-flex justify-content-between">
                  <Link to="/Employee/FlightCard" className="cancelar">
                    <button type="button" className="btn btn-danger mr-2 btn-separation cancelar">
                      Cancelar
                    </button>
                  </Link>
                  <button type="submit" className="btn btn-success iniciar-secion">
                    Agregar
                  </button>
                </div>
              </div>
          </form>          
        </div>       
      </div>
      <ToastContainerMessage/>
    </div>
  )
}
