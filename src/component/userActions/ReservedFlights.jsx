import React from 'react';

import { correct } from '../messages/correct';
import { errorMessage } from '../messages/errorMessage';
import { ToastContainerMessage } from '../messages/ToastContainerMessage';

import { alertMessage } from '../messages/alertMessage';
import axios from 'axios';


export const ReservedFlights = ({ flights }) => {




  const handleCancelClick = async (flight) => {
    const responseUser = await alertMessage("¿Está seguro que desea cancelar esta reserva?")
  

    if (responseUser) {
      const id = flight.id;
      const url = "http://localhost:5167/RemoveReservation/"+id;

      try {
        const response = await axios.delete(url, {            
          headers: {              
            'Content-Type': 'application/json',
          },
        });
        if (response.status===200) {
          correct("Reserva cancelada!");
          setTimeout(() => {
            window.location.reload();
          }, 5000);
        } else {
          errorMessage("Error al cancelar reserva!");
        }
      } catch (error) {
        console.log(error);
        errorMessage("Error al cancelar reserva!");
      }
     
    }
  };

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  const flightsChunks = chunkArray(flights, 3);

  return (
    <div>
      {flightsChunks.map((flightGroup, groupIndex) => (
        <div key={groupIndex} className="row mb-3">
          {flightGroup.map((flight, index) => (
            <div key={index} className="col-md-4">
              <div className="fond flight-item card bg-light mb-3 border-4 animate__animated animate__backInUp">
                <div className="card-body d-flex justify-content-between align-items-center ">
                  <div>
                    <h6 className="card-title">Origen: {flight.origin}</h6>
                    <h6 className="card-title">Destino: {flight.destinity}</h6>
                    <p className="card-text mb-1">Fecha: {flight.dateTime}</p>
                    <p className="card-text mb-1">Hora de salida: {flight.departureTime}</p>
                    <p className="card-text mb-1">Hora de llegada: {flight.arriveTime}</p>
                    <p className="card-text mb-1">Asiento: {flight.seat}</p>
                  </div>
                  <div className="d-flex flex-column align-items-center justify-content-center">
                    <p className="card-text">Precio: ${flight.price}</p>
                    <button className="btn btn-dark" onClick={() => handleCancelClick(flight)}>
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <ToastContainerMessage/>
    </div>
  );
};
