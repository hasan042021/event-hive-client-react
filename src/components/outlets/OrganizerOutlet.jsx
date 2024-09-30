import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function OrganizerOutlet() {
  const { role } = useSelector((state) => state.auth.user) || {};
  return role === "organizer" ? <Outlet /> : <Navigate to="/" />;
}
