import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import Skeleton from "react-loading-skeleton";

const RSVPSkeleton = ({ count = 3 }) => (
  <div>
    {/* Heading Skeleton */}
    <Card
      style={{ backgroundColor: "rgb(11,161,233)" }}
      className="p-1 px-3 mx-2 text-white rounded-2xl mt-2"
    >
      <Skeleton width="80%" height={20} />
    </Card>

    {/* Event Cards Skeleton */}
    {[...Array(count)].map((_, idx) => (
      <Card
        key={idx}
        className="w-full max-w-[48rem] m-2 mx-2 shadow-lg rounded-lg"
      >
        <List>
          <ListItem className="border flex flex-col md:flex-row items-center justify-between gap-4 p-4">
            {/* Thumbnail Skeleton */}
            <ListItemPrefix>
              <Skeleton height={100} width={100} borderRadius={8} />
            </ListItemPrefix>

            {/* Event Details Skeleton */}
            <div className="md:flex-grow flex-grow-0 mx-0 md:mx-4 w-full md:w-auto">
              <Skeleton width="70%" height={20} />
              <Skeleton width="50%" height={16} />
            </div>

            {/* Date and Time Skeleton */}
            <div className="flex flex-col items-start md:items-end mx-0 md:mx-2">
              <Skeleton width={80} height={16} />
              <Skeleton width={80} height={16} />
            </div>

            {/* Button Skeleton */}
            <div>
              <Skeleton width={100} height={36} borderRadius={999} />
            </div>
          </ListItem>
        </List>
      </Card>
    ))}
  </div>
);

export default RSVPSkeleton;
