import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const logInUser = () => {
    if (email.length === 0) {
      alert("Email has left Blank!");
    } else if (password.length === 0) {
      alert("Password has left Blank!");
    } else {
      axios.post('http://127.0.0.1:5000/login', {
        email: email,
        password: password
      })
        .then(function (response) {
          console.log(response);
          const userId = response.data.userId;
          console.log('Received user_id:', userId);
          // Redirect to the user details page passing the userId
          navigate(`/user-details/${userId}`); // Use navigate to redirect to the user details page
        })
        .catch(function (error) {
          console.log(error, 'error');
          if (error.response && error.response.status === 401) {
            alert("Invalid credentials");
          }
        });
    }
  }

  return (
    <div className="auth-form-container">
      <h1>Login page</h1>
      <form className="login-form">
        <label htmlFor="email">email</label>
        <input value={email} type="email" onChange={(e) => setEmail(e.target.value)} placeholder="youremail@gmail.com" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={password} type="password" onChange={(e) => setPass(e.target.value)} placeholder="********" id="password" name="password" />
        <button type="button" onClick={logInUser}>Login</button>
      </form>
      <button className="link-btn"><Link to="/register">Don't have an account? Register here.</Link></button>
    </div>
  );
}
