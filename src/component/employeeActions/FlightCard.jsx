import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { correct } from '../messages/correct';
import { ToastContainerMessage } from '../messages/ToastContainerMessage';
import { errorMessage } from '../messages/errorMessage';
import { setFlightsData } from '../../slice/flightsSlice';
import '../../styles/userActions.css';
import { alertMessage } from '../messages/alertMessage';
import axios from 'axios';



export const FlightCard =  () => {
  const flightsRef = useRef();
  const [flights, setFlights] = useState([]);
  const navegate = useNavigate();
  const dispatch = useDispatch();
  const adminEmail=useSelector(state=>state.auth.email)


  useEffect(() => {
    const getFlights = async () => {
      try {
          const url = "http://localhost:5167/api/Flight/GetAll";
         
          const response = await axios.post(url,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          });         

          if (response.status === 200) {
            flightsRef.current=response.data;
              setFlights(flightsRef.current);            
          } else {
              errorMessage('Error al cargar los vuelos');
          }
         
      } catch (error) {          
          errorMessage('Error al cargar los vuelos');
      }
  };
  getFlights();
  }, [])
  

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();   
    
    const filteredFlights =  flightsRef.current.filter(flight => 
      flight.origin.toLowerCase().includes(searchTerm) ||
      flight.destinity.toLowerCase().includes(searchTerm)
    );
    setFlights(filteredFlights);
  };
  


    const handleEdit = (flight) => {
      dispatch(setFlightsData(flight));
      navegate('/Employee/EditFlight');
    }

  const handleDelete = async (flight) => {
    const responseUser = await alertMessage("¿Está seguro que desea eliminar este vuelo?");
    if (responseUser) {

      try {
        const url = "http://localhost:5167/api/Flight/DeleteFlight";
          
      const  obj={
          adminEmail:adminEmail,
          idFlight:flight.idFlight
        }
        const response = await axios.delete(url, {
          data: obj,
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });      
      
      if (response.status === 200) {
        correct("Vuelo eliminado con exito!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        errorMessage("Error al eliminar el vuelo");
      }
      } catch (error) {
        
      }
      

    }
  };
    

  return (
    <div className="d-flex flex-column vh-100 ">
      <header className="bg-blue text-white py-3 px-3">
        <div className="d-flex justify-content-center align-items-center animate__animated animate__backInDown">
          <h1 className="h2 font-weight-bold">Panel de administración de vuelo</h1>
          
        </div>
      </header>
      <main className="flex-grow-1 bg-light p-3">
        <div className="bg-white shadow-sm rounded p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="container">
              <div className="row">


                <div className="col-md-4 d-flex justify-content-start">
                  <h3 className="h5 font-weight-bold">Lista de vuelos</h3>
                </div>


                <div className="col-md-4 d-flex justify-content-center">
                  <div className="input-group searchFlight w-50">
                    <input 
                      type='text'
                      className='form-control'
                      placeholder='origen o destino...'
                      name='searchFrom'
                      onChange={handleSearchChange}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text bg-dark border-primary">
                        <i className="bi bi-search text-white"></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className='col-md-4 d-flex justify-content-end'>
                <Link to={'/Employee/AddFlight'} className="btn btn-success" >Agregar Vuelo</Link>
                </div>

              </div>
            </div>
          </div>
          <div className="overflow-auto">
            <table className="table table-responsive text-center">
              <thead>
                <tr>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Fecha</th>
                  <th>Hora de salida</th>
                  <th>Hora de llegada</th>
                  <th>Capacidad</th>
                  <th>Precio</th>
                  <th className="text-right">Acción</th>
                  
                </tr>
              </thead>
              <tbody>
                {flights.map((flight) => (
                  <tr key={flight.idFlight}>
                    <td>{flight.origin}</td>
                    <td>{flight.destinity}</td>
                    <td>{flight.dateTime}</td>
                    <td>{flight.departureTime}</td>
                    <td>{flight.arriveTime}</td>
                    <td>{flight.capacity}</td>
                    <td>{flight.price}</td>

                    <td className="text-right">
                      <button 
                        className="btn btn-sm btn-primary m-2" 
                        onClick={() => handleEdit(flight)}
                      >
                        Editar
                      </button>
                      <button 
                       className="btn btn-sm btn-danger"
                       onClick={() => handleDelete(flight)}
                       >
                        Eliminar
                        </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <ToastContainerMessage/>
    </div>
  );
}
