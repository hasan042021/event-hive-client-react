import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import React from "react";
import Skeleton from "react-loading-skeleton";

const AttendeesSkeleton = ({ count = 3 }) => (
  <List>
    {[...Array(count)].map((_, idx) => (
      <ListItem
        className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4 border-b border-gray-100"
        key={idx}
      >
        {/* Avatar Skeleton */}
        <ListItemPrefix>
          <Skeleton circle height={64} width={64} />
        </ListItemPrefix>

        {/* Text Skeleton */}
        <div className="flex-1 w-full space-y-2 text-center md:text-left">
          <Skeleton height={20} width="80%" />
          <Skeleton height={16} width="60%" />
        </div>
      </ListItem>
    ))}

    {/* Skeleton for Empty State */}
    <ListItem className="w-full">
      <Skeleton height={20} width="80%" className="mx-auto" />
    </ListItem>
  </List>
);

export default AttendeesSkeleton;
