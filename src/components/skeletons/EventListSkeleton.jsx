import React from "react";
import Skeleton from "react-loading-skeleton";

const EventListSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-2 container">
      {/* Skeleton Component */}
      <div className="mx-3 md:mx-5 px-5 md:px-0">
      <Skeleton height={window.innerWidth>=750?150:350} />
      <Skeleton height={window.innerWidth>=750?150:350} />
      <Skeleton height={window.innerWidth>=750?150:350} />
      <Skeleton height={window.innerWidth>=750?150:350} />
      <Skeleton height={window.innerWidth>=750?150:350} />
      </div>
    </div>
  );
};

export default EventListSkeleton;
