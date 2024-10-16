import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
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
import { CalendarDateRangeIcon, UserIcon } from "@heroicons/react/24/outline";
import { capitalizeWords } from "../../utils/array_funcs";
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
  const truncatedDescription = description.split(" ").slice(0, 30).join(" ");
  return (
    <Card className="w-full  rounded my-2 shadow-xl">
      <List>
        <ListItem className=" flex flex-col items-start">
          {/* <ListItemPrefix>
            <Avatar size="xl" variant="rounded" src={thumbnail} />
          </ListItemPrefix> */}
          <div>
            <Typography
              className="font-sans italic  text-cyan-800"
              variant="h5"
              color="gray-600"
            >
              <i>{capitalizeWords(name)}</i>
            </Typography>
          </div>
          <div className="flex">
            <div className="">
              <Typography
                variant="small"
                color="gray"
                className="italic font-normal border-r-2 pr-2 border-gray-700"
              >
                <UserIcon className="h-3 inline-block" />{" "}
                {capitalizeWords(organizer.user.first_name)}{" "}
                {capitalizeWords(organizer.user.last_name)}
              </Typography>
            </div>
            <div>
              <Typography className="flex  gap-2 mx-2" variant="small">
                <span className="font-extralight flex border-r-2 pr-2 border-gray-800  items-center justify-center">
                  <ClockIcon className="h-3 inline-block mr-2" />

                  {convertTo12HourFormat(time)}
                </span>
                <span className=" flex items-center justify-center">
                  <CalendarDateRangeIcon className="h-3 inline-block mr-2" />

                  {formatDate(date)}
                </span>
              </Typography>
            </div>
          </div>
          <div className="h-0.5 w-20 bg-cyan-700 my-1"></div>
          <div className="mt-2 text-gray-700">{truncatedDescription}...</div>
          <div className="mt-2">
            {state?.auth?.user?.role == "organizer" || !state.auth.user ? (
              ""
            ) : (
              <Button
                size="sm"
                color="blue"
                className="capitalize rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
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
