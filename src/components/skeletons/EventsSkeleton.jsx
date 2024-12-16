import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const EventsSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2 md:gap-4 container">
      <div className="mx-0 my-4 w-full flex flex-col gap-4  md:w-4/5 md:mx-5 px-2 md:px-0">
        <Skeleton
          height={window.innerWidth >= 750 ? 250 : 300}
          className="w-full rounded-2xl"
        />
        <Skeleton
          height={window.innerWidth >= 750 ? 250 : 300}
          className="w-full rounded-2xl"
        />
        <Skeleton
          height={window.innerWidth >= 750 ? 250 : 300}
          className="w-full rounded-2xl"
        />
        <Skeleton
          height={window.innerWidth >= 750 ? 250 : 300}
          className="w-full rounded-2xl"
        />
        <Skeleton
          height={window.innerWidth >= 750 ? 250 : 300}
          className="w-full rounded-2xl"
        />
      </div>
    </div>
  );
};

export default EventsSkeleton;
