import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function AttendeeOutlet() {
  const { role } = useSelector((state) => state.auth.user) || {};
  return role === "attendee" ? <Outlet /> : <Navigate to="/" />;
}
