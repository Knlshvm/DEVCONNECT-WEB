import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailID] = useState("Kunal@gmail.com");
  const [password, setPassword] = useState("Password@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(res.data));
      navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 ">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={emailId}
          onChange={(e) => {
            setEmailID(e.target.value);
          }}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <p className="text-red-500 font-serif">{error}</p>

        <button className="btn btn-neutral mt-4" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
