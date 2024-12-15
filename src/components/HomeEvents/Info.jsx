import { Card, Chip, Tooltip, Typography } from "@material-tailwind/react";
import React from "react";

const Info = () => {
  return (
    <div className="flex items-center justify-center">
      <Chip
        className="bg-white/20 backdrop-blur-sm text-blue-500 border border-blue-300  
                transition-all duration-300 ease-in-out p-2 px-4 rounded-lg shadow-md
               shadow-blue-500/50"
        variant="ghost"
        value="Choose tags and categories"
      />
    </div>
  );
};

export default Info;
