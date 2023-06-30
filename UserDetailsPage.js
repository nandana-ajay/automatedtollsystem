import React, { useEffect, useState } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';


function UserDetailsPage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const Vehicle = () => {
    navigate(`/${userId}/register_vehicle`);
  }

  const Wallet = () => {
    navigate(`/${userId}/add_balance`);
  }

  useEffect(() => {
    console.log(userId)
     //Fetch user details when component mounts
    axios.get(`http://127.0.0.1:5000/${userId}`)
      .then(response => {
      setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    // Log the user object when it updates 
    console.log(user);
 //   console.log(user)
  }, [user]);

  if (loading) {
    return <p>Loading user details...</p>;
  }

  return (
    <div>
      {user ? (
        <div>
          <h2>User Details</h2>
          <form className="login-form">
          <p>
            <strong>Name:</strong>{((user["Users"])[0])["name"]}
          </p>
          <p>
            <strong>Balance:</strong>{((user["Users"])[0])["balance"]}
          </p>
          <p>
            <strong>Email:</strong>{((user["Users"])[0])["email"]}
          </p>
          <p><button type="submit" onClick={Vehicle} >Vehicle</button>  | <button type="submit" onClick={Wallet} >Wallet</button></p>
          </form>
        </div>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
}

export default UserDetailsPage;


