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
      navigate("/");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="card bg-base-200 w-96 shadow-lg border border-base-300">
        <div className="card-body gap-5">
          <h2 className="card-title text-2xl justify-center">Sign In</h2>

          <div>
            <label className="label text-sm">Email</label>
            <input
              type="email"
              className="input input-bordered w-full bg-base-100"
              placeholder="you@example.com"
              value={emailId}
              onChange={(e) => setEmailID(e.target.value)}
            />
          </div>

          <div>
            <label className="label text-sm">Password</label>
            <input
              type="password"
              className="input input-bordered w-full bg-base-100"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button className="btn btn-primary w-full mt-2" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
