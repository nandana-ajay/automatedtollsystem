import React, { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

export default function RegisterPage(){
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0);

    const RegisterUser = () => {
        if(name.length===0){
            alert("Name has left Blank!");

        }
        else if(email.length ===0){
            alert("Email has left Blank!");
        }
        else if(password.length ===0){
            alert("Password has left Blank!");
        } 
        else{
            axios.post('http://127.0.0.1:5000/register_user', {
                name: name,
                balance: balance,
                email: email,
                password: password
                })
                .then(function(response) {
                    console.log(response);
                  })
                .catch(function(error) {
                    console.log(error, 'error');
                    if (error.response && error.response.status === 401) {
                    alert("Invalid credentials");
                    }
                });
                            
        };
    }
    

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
        <form className="register-form" >
            <label htmlFor="name">Full name</label>
            <input value={name} name="name" onChange={(e) => setName(e.target.value)} id="name" placeholder="full Name" />
            <label htmlFor="email">email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}type="email" placeholder="youremail@gmail.com" id="email" name="email" />
            <label htmlFor="password">password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
            <button type="submit" onClick={RegisterUser}><Link to="/login" className="btn btn-success"> Register</Link></button>
        </form>
        <button className="link-btn" ><a href="/login">Already have an account? Login here.</a></button>
    </div>
    )
}