import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 container">
      <div className="mx-3 md:mx-5 px-5 md:px-0">
      <Skeleton height={window.innerWidth>=750?250:350} className="w-full" />
      <Skeleton height={window.innerWidth>=750?250:350} className="w-full" />
      <Skeleton height={window.innerWidth>=750?250:350} className="w-full" />
      <Skeleton height={window.innerWidth>=750?250:350} className="w-full" />
      <Skeleton height={window.innerWidth>=750?250:350} className="w-full" />
      </div>
    </div>
  );
};

export default EventsSkeleton;
