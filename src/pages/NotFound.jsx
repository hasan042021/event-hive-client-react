import { Button } from "@material-tailwind/react";
import React from "react";
import { Link, Navigate } from "react-router-dom";

export default function NotFound({}) {
  return (
    <div>
      <div>404</div>
      <div>Ops! Route Not Found</div>
      <Button>
        <Navigate to="/">Go back</Navigate>
      </Button>
    </div>
  );
}
