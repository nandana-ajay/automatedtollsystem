import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UserVehicles() {
    const { userId } = useParams();
    const [vehicles, setUsers] = useState([]);
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/${userId}/vehicles`);
      setUsers(response.data.vehicles);
      console.log(vehicles);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Vehicle List</h2>
      {vehicles === null || vehicles === undefined ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {vehicles.map((vehicle, index) => (
            <li key={index}>
              <strong>Vehicle id:</strong> {vehicle.vehicle_id}, <strong>Vehicle type:</strong> {vehicle.vehicle_type}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}




