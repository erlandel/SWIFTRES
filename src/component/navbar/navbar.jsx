import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../slice/authSlice';
import '../../styles/home.css';

export const Navbar = () => {



  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const role = useSelector(state => state.auth.role);
  const email=useSelector(state=> state.auth.email);

  const [showDropdown, setShowDropdown] = useState(false)
  const dispatch = useDispatch();
  const navigate=useNavigate();



  const handleClickUserSession=()=>{
    setShowDropdown(!showDropdown);
  }

  const handelUserExitSession=()=>{
    dispatch(logout());
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/">
          <i className="fas fa-plane"></i>
        </Link>

        <Link className="navbar-brand" to="/">
          SWIFTRES
        </Link>

        <div className="navbar-collapse justify-content-end">
          <ul className="navbar-nav">           
            <li className="nav-item">
              <NavLink 
                  end
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  to="/">
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                  end
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  to="/Login"
                  style={{ display: isAuthenticated ? 'none' : 'block' }}>
                Login
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink 
                  end
                  className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                  to="/RegisterForm"
                  style={{ display: isAuthenticated ? 'none' : 'block' }}>
                Register
              </NavLink>
            </li>

           
            {isAuthenticated && (role === 'User' || role === 'employee' || role === 'Admin') && (   
               <>
        <li className="nav-item">
            <NavLink 
                end
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                to="/user/FlightList"
            >
                Vuelos
            </NavLink>                
        </li>
        <li className="nav-item">
            <NavLink 
                end
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                to="/user/UserFlightList"
            >
               Reservas
            </NavLink>                
          </li>
            </>
              )}

            {isAuthenticated && (role === 'employee'|| role === 'Admin') && (
              <li className="nav-item">
                <NavLink 
                    end
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    to="/Employee/FlightCard">
                  Administrar Vuelos
                </NavLink>
              </li>
            )}

            {isAuthenticated && role === 'Admin' && (
              <li className="nav-item">
                <NavLink 
                    end
                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                    to="/Admin/UserAdmin">
                  Administrar usuarios
                </NavLink>
              </li>
            )}

          {isAuthenticated && email!== null && (
            <li className="nav-item mt-1">
               <button className='btn btn-danger userSession' onClick={handleClickUserSession}>
                 {email.charAt(0)}
               </button>              
            {showDropdown && (
              <div className="dropdown-menu show">
                <header>
                  <h6>{role}</h6>
                  <h6>{email}</h6>
                  <section>
                  <button className='btn btn-danger' onClick={handelUserExitSession}>
                    Cerrar sesión	
                  </button>
                  </section>
                </header>
              </div>
            )}
            </li>
          )}
            
          </ul>
        </div>
      </div>
    </nav>
  );
};
