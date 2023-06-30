import React, { } from "react";

import { Link } from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
        <p><button type="submit"><Link to="/login" className="btn btn-success">Login</Link></button>  | <button><Link to="/register" className="btn btn-success">Register</Link></button></p>
        </div>
    
    );
}