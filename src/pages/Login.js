import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { client } from "../supabase/client";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await client.auth.signIn({ email });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    if(client.auth.user()){
      navigate("/");
    }
  },[navigate]);

  return (
    <div className="row pt-4">
      <div className="col-md-4 offset-md-4">
      <form onSubmit={handleSubmit} className="card card-boday">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
        <button className="btn btn-primary">Send</button>
      </form>
      </div>
    </div>
  );
}

export default Login;
