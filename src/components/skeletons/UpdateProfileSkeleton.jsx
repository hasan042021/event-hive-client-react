import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UpdateProfileSkeleton() {
  return (
    <div className="md:px-4 px-2 py-2 md:py-4 container mx-auto  ">
      <div className="bg-white w-full grid grid-cols-1 md:grid-cols-4 gap-4 rounded-2xl">
        {/* Profile image and user info skeleton */}
        <div className="md:col-span-2 col-span-4">
          <div className="flex my-4 flex-col justify-center items-center">
            <div>
              {/* Circular skeleton for profile image */}
              <Skeleton
                circle={true}
                height={window.innerWidth >= 750 ? 235 : 160}
                width={window.innerWidth >= 750 ? 235 : 160}
              />
            </div>
            <div className="w-full flex flex-col items-center mt-4">
              {/* Name skeleton */}
              <Skeleton width={300} height={30} />
              {/* Role skeleton */}
              <Skeleton width={300} height={19} className="mt-2" />
            </div>
          </div>
        </div>

        {/* Form skeleton */}
        <div className="md:col-span-2 col-span-4 flex flex-2 my-3 flex-col items-center justify-center">
          <div className="p-3 w-full m-2 space-y-4">
            <Skeleton width="100%" height={20} />

            {/* Form fields skeleton */}
            <div className="space-y-4">
              <Skeleton height={40} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </div>

            {/* Divider skeleton */}
            <Skeleton height={1} />

            {/* Settings skeleton */}
            <Skeleton width="100%" height={20} />

            {/* Select skeleton */}
            <Skeleton height={40} />

            {/* Checkbox skeletons */}
            <Skeleton height={20} width="100%" />
            <Skeleton height={20} width="100%" />

            {/* Button skeleton */}
            <Skeleton height={40} width="100%" />
          </div>
        </div>
      </div>
    </div>
  );
}
