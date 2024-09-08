import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";


import { Login } from "../component/auth/Login";
import { RegisterForm } from "../component/auth/RegisterForm";
import { RecoverPassword } from "../component/auth/RecoverPassword";
import { CodePassword } from "../component/auth/CodePassword";
import { ChangePassword } from "../component/auth/ChangePassword";
import { UserRouters } from "./UserRouters";
import { DashboardRoutes } from "./DashboardRoutes";
import { FlightReservation } from "../component/userActions/FlightReservation";
import { EmployeeRouter } from "./EmployeeRouter";
import { EditFlight } from "../component/employeeActions/EditFlight";
import { AddFlight } from "../component/employeeActions/AddFlight";
import { AdminRouter } from "./AdminRouter";
import { ProtectedRouteUser } from "../protectedRoute/ProtectedRouteUser";
import { ProtectedRouterEmployee } from "../protectedRoute/ProtectedRouterEmployee";
import { ProtectedRouterAdmin } from "../protectedRoute/ProtectedRouterAdmin";
import { ProtectedRouterAuth } from "../protectedRoute/ProtectedRouterAuth";




export const AppRouters = () => {

  
  return (
    <div>

      <BrowserRouter>
          <Routes>

            <Route element={<ProtectedRouterAuth/>}>
              <Route path="/Login" element={<Login/>} />
              <Route path="/RegisterForm" element={<RegisterForm/>} />
              <Route path="/RecoverPassword" element={<RecoverPassword/>}/>
              <Route path="/CodePassword" element={<CodePassword/>}/>
              <Route path="/ChangePassword" element={<ChangePassword/>}/>  
            </Route>
            
              <Route path="/*" element={<DashboardRoutes/>}/>

            <Route element={<ProtectedRouteUser/>}>              
                <Route path="/User/FlightReservation" element={<FlightReservation/>} />  
                <Route path="/User/*" element={<UserRouters/>}/>
             </Route>        
          
            <Route element={<ProtectedRouterEmployee/>}>
              <Route path="/Employee/AddFlight" element={<AddFlight/>}/>
              <Route path="/Employee/EditFlight" element={<EditFlight/>}/>
              <Route path="/Employee/*" element={<EmployeeRouter/>}/>
            </Route>
          

              <Route element={<ProtectedRouterAdmin/>}>            
                  <Route path="/Admin/*" element={<AdminRouter/>}/>
                </Route>    
              

          </Routes>
      </BrowserRouter>
    </div>
  );
};
