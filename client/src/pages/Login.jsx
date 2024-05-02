import React from "react";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase.config";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
      });
      console.log(email);
      console.log(data);
      console.log(error);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="youremail@example.com"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <button>Send</button>
      </form>
    </div>
  );
}

export default Login;
