import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import { useSelector } from "react-redux";
import { userInfoSet } from "../../features/auth/authSlice";
import { Link, useMatch, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [myError, setMyError] = useState("");

  const [login, { data: res, isLoading, error, isError, isSuccess }] =
    useLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && res?.token) {
      navigate("/");
    }
  }, [isSuccess, res?.id]);
  // useEffect(() => {
  //   toast.error(res?.error);
  //   console.log(res?.error);
  // }, [res?.error]);
  useEffect(() => {
    if (isSuccess && res?.error) {
      // This will trigger only when there is an error response
      console.log(res?.error);
      setMyError(res?.error);
    }

    if (isError && error) {
      // Handle errors from the server (e.g., network issues)
      toast.error("Login Failed: " + (error?.data?.detail || "Unknown error"));
    }

    // Reset the error state after showing the toast (optional)
  }, [isSuccess, res?.error, isError, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    login({ username, password });
  };

  return (
    <div className="flex flex-col justify-center w-full items-center h-screen bg-gray-100 relative">
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
          {myError && (
            <div
              className={`absolute border-red-800 border-l-8 top-0 right-2 bg-white text-red-800 p-2 ps-3 shadow flex gap-2 items-center cursor-pointer transform transition-all duration-300 ease-in-out 
    ${myError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mx-2 text-red"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>

              <p>{myError}</p>

              {/* cross button */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 mx-2 cursor-pointer"
                onClick={() => setMyError("")}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
          <p>
            Don't have an Account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
