import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useSelector } from "react-redux";
import { userInfoSet } from "../../features/auth/authSlice";
import { Link, useMatch, useNavigate } from "react-router-dom";
import Message from "../../components/common/Alert";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [myerror, setMyerror] = useState("");

  const [login, { data: user, isLoading, error, isError, isSuccess }] =
    useLoginMutation();
  const organizerLogin = useMatch("/organizer");
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && user?.token) {
      navigate("/");
    }
    setMyerror(user?.error);
  }, [isSuccess, organizerLogin, user?.id]);

  // useEffect(() => {
  //   if (isSuccess || isError) {
  //     setOpen(true);
  //   }
  // }, [isError, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    login({ username, password });
  };

  return (
    <div className="flex flex-col justify-center w-full items-center h-screen bg-gray-100">
      <div className="w-80 max-w-md p-5 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-700 text-start">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 text-start">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
          <p>
            Don't have an Account? <Link to="/register">Sign Up</Link>
          </p>
          {myerror ? <p className="text-red-700 border">{myerror}</p> : ""}
        </form>
      </div>
    </div>
  );
}
