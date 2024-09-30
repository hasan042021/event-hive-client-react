import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { Link } from "react-router-dom";
import Message from "../../components/common/Alert";

export default function Register() {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("attendee");
  // Default to Organizer
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [
    register,
    { data: registerData, isLoading, error, isSuccess, isError },
  ] = useRegisterMutation();
  const resetForm = () => {
    setUsername("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setRole("Organizer");
    setPassword("");
    setConfirmPassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("here");

    if (password != confirm_password) {
      console.log("Pass did not match");
      return;
    }
    // Submit form data to API here
    const formData = {
      username,
      first_name,
      last_name,
      email,
      role,
      password,
      confirm_password,
    };
    console.log("Form data:", formData);
    register(formData);
  };
  useEffect(() => {
    if (isSuccess || isError || registerData) {
      resetForm();
    }
  }, [isError, isSuccess]);
  return (
    <div className="flex flex-col justify-center w-full items-center  bg-gray-100">
      <div className="w-full max-w-md p-4  bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm text-start font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 p-2 focus:outline-none
block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-start text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={first_name}
              required
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block 
 text-start text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={last_name}
              required
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block 
 text-start text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* ... other fields */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm text-start font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option>Select role</option>
              <option value="organizer">Organizer</option>
              <option value="attendee">Attendee</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm text-start font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1  p-2 focus:outline-none
block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirm_password"
              className="block  
text-sm text-start font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              required
              value={confirm_password}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1  p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full text-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white  hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>
        <p>
          Already Have an Account? <Link to="/login">Login</Link>
        </p>
        {isError ? (
          <p className="border p-2 text-red-700">{error?.data?.error}</p>
        ) : (
          ""
        )}
        {isSuccess && registerData?.username ? (
          <p className="border p-2 text-red-700">
            A User With that username already exists
          </p>
        ) : (
          ""
        )}
        {isSuccess && registerData?.error ? (
          <p className="border p-2 text-green-700">{registerData?.error}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
