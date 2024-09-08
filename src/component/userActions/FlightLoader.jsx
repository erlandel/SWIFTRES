import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

import { setFlightsData } from '../../slice/flightsSlice';
import '../../styles/userActions.css';

export const FlightLoader = ({ flights }) => {
  const dispatch = useDispatch();

  const handleReservarClick = (flight) => {
    // Despachar la acción para almacenar los datos del vuelo en el estado de Redux
    dispatch(setFlightsData(flight));
  };

  // Función para dividir el array de vuelos en grupos de tres
  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };

  // Dividir los vuelos en grupos de tres
  const flightsChunks = chunkArray(flights, 3);

  return (
    <div>
      {flightsChunks.map((flightGroup, groupIndex) => (
        <div key={groupIndex} className="row mb-3 ">
          {flightGroup.map((flight, index) => (
            <div key={index} className="col-md-4">
              <div className="fond flight-item card bg-light mb-3 border-4 animate__animated animate__backInUp">
                <div className="card-body d-flex justify-content-between align-items-start ">
                  <div>
                    <h6 className="card-title">Origen: {flight.origin}</h6>
                    <h6 className="card-title">Destino: {flight.destinity}</h6>
                    <p className="card-text">Fecha: {flight.dateTime}</p>
                  </div>
                  <div className="text-right">
                    <p className="card-text">Precio: ${flight.price}</p>
                    <Link
                      className="btn btn-dark"
                      to="/User/FlightReservation"
                      onClick={() => handleReservarClick(flight)}
                    >
                      Reservar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
