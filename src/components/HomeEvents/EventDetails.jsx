import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Chip,
  Button,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";
import {
  convertTo12HourFormat,
  formatDate,
} from "../../utils/date_time_format";
import { useSelector } from "react-redux";
export default function EventDetails({ event }) {
  const {
    id,
    thumbnail,
    category,
    organizer,
    name,
    description,
    tags,
    time,
    date,
  } = event;
  const state = useSelector((state) => state);
  return (
    <Card className="w-full my-2 shadow-md">
      <List>
        <ListItem className="border flex items-center justify-between">
          <ListItemPrefix>
            <Avatar size="xl" variant="rounded" src={thumbnail} />
          </ListItemPrefix>
          <div>
            <Typography
              className="font-bold text-cyan-800"
              variant="h6"
              color="gray-600"
            >
              {name}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="italic font-normal"
            >
              Organized by: {organizer.user.first_name}{" "}
              {organizer.user.last_name}
            </Typography>
          </div>
          <div>
            <Typography variant="outline">
              <span className=" flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
                    clipRule="evenodd"
                  />
                </svg>

                {convertTo12HourFormat(time)}
              </span>
              <span className=" flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>

                {formatDate(date)}
              </span>
            </Typography>
          </div>
          <div>
            {state?.auth?.user?.role == "organizer" ? (
              ""
            ) : (
              <Button
                size="sm"
                color="blue"
                className="capitalize  rounded-full"
              >
                <Link
                  className="text-white font-bold hover:text-white"
                  to={`attendee/events/${id}`}
                >
                  See Details
                </Link>
              </Button>
            )}
          </div>
        </ListItem>
      </List>
    </Card>
  );
}
