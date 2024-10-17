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
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full max-w-[48rem] flex-row m-2">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          {/* Skeleton for the image */}
          <Skeleton className="h-full w-full object-cover" width="100%" />
        </CardHeader>
        <CardBody>
          {/* Skeleton for the organizer name */}
          <Typography variant="h6" className="mb-4 uppercase">
            <Skeleton width="50%" />
          </Typography>
          {/* Skeleton for the event name */}
          <Typography variant="h4" className="mb-2">
            <Skeleton width="70%" />
          </Typography>
          {/* Skeleton for the category */}
          <Typography className="font-normal">
            <Skeleton width="30%" />
          </Typography>
          {/* Skeleton for the description */}
          <Typography className="mb-8 font-normal">
            <Skeleton count={3} />
          </Typography>
          {/* Skeleton for the tags */}
          <div className="flex gap-2">
            <Skeleton width={80} height={30} />
            <Skeleton width={80} height={30} />
            <Skeleton width={80} height={30} />
          </div>
          {/* Skeleton for the button */}
          <div className="mt-4">
            <Skeleton width={100} height={40} />
          </div>
        </CardBody>
      </Card>
      <Card className="w-full text-start flex flex-col p-3  max-w-[48rem]  mt-2">
        <Skeleton className="w-1/4" height={50} />
        <Skeleton className="w-full" height={150} />
      </Card>
    </div>
  );
}
