import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventsSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton height={150} className="w-full" />
      <Skeleton height={150} className="w-full" />
      <Skeleton height={150} className="w-full" />
      <Skeleton height={150} className="w-full" />
      <Skeleton height={150} className="w-full" />
    </div>
  );
};

export default EventsSkeleton;
