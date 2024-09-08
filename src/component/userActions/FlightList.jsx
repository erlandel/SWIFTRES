import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import { FlightLoader } from "./FlightLoader";
import { errorMessage } from "../messages/errorMessage";
import '../../styles/userActions.css';
import { ToastContainer } from "react-toastify";


export const FlightList = () => {
 const [selectedDate, setSelectedDate] = useState(null);
 const [searchOriginTerm, setSearchOriginTerm] = useState('');
 const [searchDestinationTerm, setSearchDestinationTerm] = useState('');
 const [flights, setFlights] = useState([]);



 useEffect(() => {
  const getFlights = async () => {
    const url = `http://localhost:5167/api/Flight/GetAll`;
    try {
        
      const response = await axios.post(url, {
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
        errorMessage('Error al cargar los vuelos');
    }
};
getFlights();
}, [])
 

 const handleDateChange = (dateTime) => {
    setSelectedDate(dateTime);
 };

 const handleSearchChange = (event) => {
    const { name, value } = event.target;
    if (name === 'origin') {
      setSearchOriginTerm(value);
    } else if (name === 'destinity') {
      setSearchDestinationTerm(value);
    }
 };


 // Filtrar los vuelos basado en la fecha seleccionada, origen y destino
 const filteredFlights = flights.filter(flight => {
    const flightDate = new Date(flight.dateTime);
    const selectedDateFormatted = selectedDate ? selectedDate.toISOString().split('T')[0] : null;
    const dateMatches = !selectedDate || flightDate.toISOString().split('T')[0] === selectedDateFormatted;

    const originMatches = !searchOriginTerm || flight.origin.toLowerCase().includes(searchOriginTerm.toLowerCase());
    const destinationMatches = !searchDestinationTerm || flight.destinity.toLowerCase().includes(searchDestinationTerm.toLowerCase());

    return dateMatches && originMatches && destinationMatches;
 });


 return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 ">
      <div className="card cmx-auto p-2 shadow-sm min-vh-100 w-100 bg-custom">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 animate__animated animate__lightSpeedInLeft">
            <div className="text-white">
              <h1>Encuentra tu próximo vuelo</h1>
              <h5>Busca y reserva tus vuelos con facilidad</h5>
            </div>
          </div>

          <div className="col-md-6">
            <div className="row align-items-center justify-content-start">
              <div className="col-auto pe-1">
                <span className="bi bi-calendar3 fs-2   text-white"></span>
              </div>

              <div className="col-auto pe-1 w-auto flex-grow-1">
                <DatePicker
                 selected={selectedDate}
                 onChange={handleDateChange}
                 dateFormat="dd/MM/yyyy"
                 placeholderText="Selecciona una fecha"
                 className="form-control"
                 locale={es}
                />
              </div>

              <div className="col-md-6 mt-3 mt-md-0 flex-grow-1">
                <form className="mt-3 mb-4">
                 <div className="row">
                    <div className="col">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Origen..."
                          name="origin"
                          value={searchOriginTerm}
                          onChange={handleSearchChange}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text bg-dark border-primary">
                            <i className="bi bi-search text-white"></i>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Destino..."
                          name="destinity"
                          value={searchDestinationTerm}
                          onChange={handleSearchChange}
                        />
                        <div className="input-group-append">
                          <span className="input-group-text bg-dark border-primary">
                            <i className="bi bi-search text-white"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                 </div>
                </form>
              </div>
            </div>
          </div>

          <div className="container">
            <FlightLoader flights={filteredFlights} />
          </div>

        </div>
      </div>
      <ToastContainer/>
    </div>
 );
};
