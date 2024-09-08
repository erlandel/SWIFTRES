import React, {useEffect, useState } from 'react';
import { ReservedFlights } from './ReservedFlights';

import { useSelector } from 'react-redux';
import { errorMessage } from '../messages/errorMessage';
import axios from 'axios';



export const UserFlightList = () => {
   
    const email=useSelector((state) => state.auth.email);
    const [flights, setFlights] = useState([]);

 
useEffect(() => {
 const getFlights=async()=>{
    try {
        const url = `http://localhost:5167/GetAll/${encodeURIComponent(email)}`;   
         
        const response = await axios.get(url, {            
            headers: {              
              'Content-Type': 'application/json',
            },
          });          
        if (response.status === 200) {
            setFlights(response.data);            
        } else {
            errorMessage('Error al cargar los vuelos');
        }
    } catch (error) {
        console.log(error);
    }
 }
 getFlights();
}, [email])   


    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="card cmx-auto p-2 shadow-sm min-vh-100 w-100 bg-custom">
                <div className="row justify-content-center align-items-center">
                    <div className="col-md-12 text-center animate__animated animate__backInDown">
                        <div className='text-white'>
                            <h1>Vuelos reservados</h1>
                        </div>
                    </div>

                    <div className="container">
                        <ReservedFlights flights={flights} />
                    </div>
                </div>
            </div>
        </div>
    );
};
