import { Card, Chip, Tooltip, Typography } from "@material-tailwind/react";
import React from "react";

const Info = () => {
  return (
    <div className="flex items-center justify-center">
      <Chip
        className="shadow-xl"
        variant="ghost"
        value="Choose tags and cetegories"
      />
    </div>
  );
};

export default Info;
