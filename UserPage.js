
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UserPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data.Users);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Name:</strong> {user.name}, <strong>Balance:</strong> {user.balance}, <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}