import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";

export default function SingleEventSkeleton() {
  return (
    <div className="flex flex-col items-center justify-start">
      <div className="w-full max-w-[40rem] flex flex-col m-2 border-2 bg-opacity-70 backdrop-blur-md bg-white/50 shadow-lg rounded-lg overflow-hidden">
        {/* Image Skeleton */}
        <div className="relative w-full max-h-[60vh] h-[240px] bg-gray-200">
          <Skeleton height="100%" width="100%" />
          <div className="absolute bottom-4 left-4">
            <Skeleton width={80} height={20} className="rounded-full" />
          </div>
        </div>

        <div className="p-4 md:p-8 flex-1">
          {/* Title Skeleton */}
          <div className="mb-3">
            <Skeleton width="70%" height={24} />
            <Skeleton width="50%" height={16} className="mt-2" />
          </div>

          {/* Time and Date Skeleton */}
          <div className="flex flex-row my-4 gap-5 md:gap-10 items-start">
            <div className="flex flex-col gap-2 items-start">
              <Skeleton width={60} height={16} />
              <Skeleton width={100} height={16} />
            </div>
            <div className="flex flex-col gap-2 items-start">
              <Skeleton width={60} height={16} />
              <Skeleton width={100} height={16} />
            </div>
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap my-4 items-center gap-2">
            {[...Array(3)].map((_, index) => (
              <Skeleton
                key={index}
                width={60}
                height={20}
                className="rounded-full"
              />
            ))}
          </div>

          {/* Description Skeleton */}
          <div className="my-4">
            <Skeleton width="30%" height={16} />
            <Skeleton count={2} height={16} className="mt-2" />
          </div>

          {/* Creator Skeleton */}
          <div className="my-4">
            <Skeleton width="20%" height={16} />
            <div className="flex items-center gap-2">
              <Skeleton circle width={24} height={24} />
              <Skeleton width="50%" height={16} />
            </div>
          </div>

          {/* Attendees Skeleton */}
          <div className="flex items-center my-4">
            <Skeleton circle width={32} height={32} />
            <Skeleton width="30%" height={16} className="ml-4" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center justify-center gap-6 my-6">
            <Skeleton width={100} height={40} className="rounded-full" />
            <Skeleton width={100} height={40} className="rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
