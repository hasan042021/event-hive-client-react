import React from "react";
import Skeleton from "react-loading-skeleton";

const SidebarSkeleton = () => {
  return (
    <div className="p-4">
      <Skeleton height={40} className="mb-2" />
      <Skeleton count={5} height={30} className="mb-2" />
      <Skeleton height={30} width={100} className="mb-4" />
      <Skeleton height={40} className="mb-2" />
      <Skeleton count={8} height={30} className="mb-2" />
    </div>
  );
};

export default SidebarSkeleton;
