import React from "react";
import Skeleton from "react-loading-skeleton";

const EventListSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      {/* Skeleton Component */}
      <Skeleton height={150} />
      <Skeleton height={150} />
      <Skeleton height={150} />
      <Skeleton height={150} />
      <Skeleton height={150} />
    </div>
  );
};

export default EventListSkeleton;
