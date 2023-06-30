import React, { useState } from "react";
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function UserVehiclesPage() {
  const { userId } = useParams();
  const [vehicle_id, setId] = useState('');
  const [vehicle_type, setType] = useState('');
  const navigate = useNavigate();

  const View_Vehicles =() =>{
    navigate(`/${userId}/vehicles`);
  }

  const Add_Vehicle = () =>{
    if(vehicle_id.length===0)
    {
        alert("Vehicle Id is Blank!");

    }
    else if(vehicle_type.length ===0){
        alert("Vehicle type has left Blank!");
    } 
    else{
        console.log(userId)
        axios.post(`http://127.0.0.1:5000/${userId}/register_vehicle`, {
            vehicle_id: vehicle_id,
            vehicle_type: vehicle_type
            })
            .then(function(response) {
                console.log(response);
                navigate(`/${userId}/vehicles`);
              })
            .catch(function(error) {
                console.log(error, 'error');
                if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
                }
            });
    
        }
      }
  
  return (
    <div className="auth-form-container">
      <h1>Add Vehicle</h1>
      <form className="login-form">
        <label htmlFor="vehicle_id">Vehicle id</label>
        <input value={vehicle_id} onChange={(e) => setId(e.target.value)} placeholder="number" id="vehicle_id" name="vehicle_id" />
        <label htmlFor="vehicle_type">Vehicle Type</label>
        <input value={vehicle_type} onChange={(e) => setType(e.target.value)} placeholder="Car/Bus/Truck" id="vehicle_type" name="vehicle_type" />
        <button type="button" onClick={Add_Vehicle} >Add Vehicle</button>
      </form>
      <button type="button" onClick={ View_Vehicles }>View Vehicles</button>
      </div>
  );
}
