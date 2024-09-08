import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import { ToastContainerMessage } from "../messages/ToastContainerMessage";
import { errorMessage } from "../messages/errorMessage";
import { correct } from "../messages/correct";
import { alertMessage } from "../messages/alertMessage";


export const UserAdmin = () => {
  const email = useSelector((state) => state.auth.email);
  const usersOriginalRef = useRef([]);
  const [users, setUsers] = useState([]);
  const adminEmail=useSelector(state=> state.auth.email)



  useEffect(() => {
    const getUser = async () => {
      try {       
        const url = `http://localhost:5167/api/User/GetAll?Email=${encodeURIComponent(email)}`;    

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }); 

        if (response.status === 200) {          
          usersOriginalRef.current = response.data;         
          setUsers(usersOriginalRef.current)        
                 
        } else {
            errorMessage('Error al cargar los vuelos');
        }       
      } catch (error) {
        errorMessage("Error al cargar los vuelos");
      }
    };
    getUser();
  }, [adminEmail,email]);



  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filtered = usersOriginalRef.current.filter(
      (user) =>
        user.email.toLowerCase().includes(searchTerm) ||
        user.ci.toLowerCase().includes(searchTerm)
    );

    setUsers(filtered);
  };

  const handleRoleChange = async (users, role) => {

    try {
      const responseUser = await alertMessage(
        "¿Está seguro que desea cambiar el rol de este usuario?"
      );
      if (responseUser) {
        const emailUser = users.email;
        const dataObject = {  adminEmail,emailUser, role };
        const url = "http://localhost:5167/api/User/ChangeRole";  

        try {
          const response = await axios.patch(url, dataObject, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          }); 
          if (response.status === 200) {
            correct("Rol cambiado con exito!");
            setTimeout(() => {
              window.location.reload();
            }, 5000);
          } else {
            errorMessage("Error al realizar el cambio de rol");
          }
        }
        catch (error) {
          console.log(error);
        }
      }
       
      }catch (error) {
      console.error("Error al cambiar el rol:", error);
    }
  };

  const handleDelete = async (users) => {
    const responseUser = await alertMessage(
      "¿Está seguro que desea eliminar este usuario?"
    );
    if (responseUser) {
      const url = `http://localhost:5167/api/User/DeleteUser`;    
      const obj={
        adminEmail:adminEmail,
        emailUser:users.email
      }
      const response = await axios.delete(url, {
        data:obj,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      }); 
      if (response.status === 200) {
        correct("Usuario eliminado con exito!");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      } else {
        errorMessage("Error al eliminar el usuario");
      }
    }
  };

  return (
    <div className="d-flex flex-column vh-100 ">
      <header className="bg-blue text-white py-3 px-3">
        <div className="d-flex justify-content-center align-items-center animate__animated animate__backInDown">
          <h2 className="h2 font-weight-bold">
            Panel de administración de usuarios
          </h2>
        </div>
      </header>
      <main className="flex-grow-1 bg-light p-3">
        <div className="bg-white shadow-sm rounded p-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="container">
              <div className="row">
                <div className="col-md-10">
                  <h3 className="h5 font-weight-bold">Lista de usuarios</h3>
                </div>
                <div className="col-md-2">
                  <div className="input-group searchFlight">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="email o ci ..."
                      name="searchFrom"
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
            </div>
          </div>
          <div className="overflow-auto">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Email</th>
                  <th>Caranet de identidad</th>
                  <th>Rol</th>

                  <th className="text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.ci}>
                      <td>{user.username}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.ci}</td>                                       
                      
                      <td className="text-right">
                        <select
                          className="form-control"
                          value={user.role}
                          onChange={(e) =>
                            handleRoleChange(user, e.target.value)
                          }
                        >
                          <option value="User">Usuario</option>
                          <option value="Employee">Empleado</option>
                          <option value="Admin">Administrador</option>
                        </select>
                      </td>

                      <td className="text-right">
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(user)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">No hay usuarios para mostrar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <ToastContainerMessage />
    </div>
  );
};
