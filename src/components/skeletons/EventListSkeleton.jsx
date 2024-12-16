import React from "react";
import Skeleton from "react-loading-skeleton";

const EventListSkeleton = () => {
  return (
    <div className="w-full flex px-3 md:px-0 my-4 flex-col items-center gap-5 container">
      {/* Skeleton Component */}
      <div className="mx-3 w-full md:w-4/5 flex flex-col gap-4 md:mx-5 md:px-5">
        <Skeleton
          className="rounded-2xl"
          height={window.innerWidth >= 750 ? 250 : 400}
        />
        <Skeleton
          className="rounded-2xl"
          height={window.innerWidth >= 750 ? 250 : 400}
        />
        <Skeleton
          className="rounded-2xl"
          height={window.innerWidth >= 750 ? 250 : 400}
        />
        <Skeleton
          className="rounded-2xl"
          height={window.innerWidth >= 750 ? 250 : 400}
        />
        <Skeleton
          className="rounded-2xl"
          height={window.innerWidth >= 750 ? 250 : 400}
        />
      </div>
    </div>
  );
};

export default EventListSkeleton;
