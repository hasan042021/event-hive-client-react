import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../features/auth/authApi";
import { Link } from "react-router-dom";
import Message from "../../components/common/Alert";
import { toast } from "react-toastify";
import ScaleLoader from "react-spinners/ScaleLoader";
import registerImage from "../../assets/images/authentication.jpg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("attendee");
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
    setRole("attendee");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm_password) {
      toast.error("Passwords do not match");
      return;
    }

    const formData = {
      username,
      first_name,
      last_name,
      email,
      role,
      password,
      confirm_password,
    };

    register(formData);
  };

  useEffect(() => {
    if (isSuccess && registerData?.message) {
      toast.success(registerData.message);
      resetForm();
    }

    if (isError) {
      toast.error(error?.data?.error);
    }

    if (isSuccess && registerData?.error) {
      toast.error(registerData.error);
    }

    if (isSuccess && registerData?.username) {
      toast.error("A user with that username already exists");
    }
  }, [isError, isSuccess, registerData]);

  return (
    <div className="flex my-2 justify-center w-full items-center min-h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md">
        {/* Left side with image */}
        <div className="hidden md:block w-1/2">
          <img
            src="https://plus.unsplash.com/premium_photo-1681487814165-018814e29155?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Register"
            className="object-cover w-full h-full rounded-l-lg"
          />
        </div>

        {/* Right side with register form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
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
                className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="block text-start text-sm font-medium text-gray-700"
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
                className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-start text-sm font-medium text-gray-700"
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
                className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              />
            </div>
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
                className="mt-1 block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white text-gray-900"
              >
                <option value="attendee">Attendee</option>
                <option value="organizer">Organizer</option>
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
                className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm_password"
                className="block text-sm text-start font-medium text-gray-700"
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
                className="mt-1 p-2 focus:outline-none block w-full rounded-md border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center text-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-white hover:bg-indigo-700"
            >
              {isLoading ? (
                <>
                  <span className="font-sans">Registering User</span>{" "}
                  <ScaleLoader color="white" />
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
          <p className="mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
