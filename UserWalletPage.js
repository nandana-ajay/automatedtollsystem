import React, { useState ,useEffect} from "react";
import axios from 'axios';
import { useParams ,useNavigate } from 'react-router-dom';

export default function UserWalletPage() {
  const { userId } = useParams();
  const [balance, setBalance] = useState('');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const Add_Amount = () =>{
    if(balance.length===0)
    {
        alert("Amount not entered");

    }
    else{
        console.log(userId)
        axios.post(`http://127.0.0.1:5000/${userId}/add_balance`, {
            balance: balance
            })
            .then(function(response) {
                console.log(balance)
                console.log(response);
                navigate(`/user-details/${userId}`);
              })
            .catch(function(error) {
                console.log(error, 'error');
                if (error.response && error.response.status === 401) {
                alert("Invalid credentials");
                }
            });
    
        
        }
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
    <div className="auth-form-container">
      <h1>Add Amount</h1>
      <form className="login-form">
        <label htmlFor="balance">Amount</label>
        <input value={balance} onChange={(e) => setBalance(e.target.value)} placeholder="number" id="vehicle-id" name="vehicle-id" />
        <button type="button" onClick={Add_Amount} >Add Amount</button>
      </form>
      <p>
        <strong>Balance:</strong>{((user["Users"])[0])["balance"]}
        </p>
      </div>
      
  );
}
