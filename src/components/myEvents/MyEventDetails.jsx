import {
  Avatar,
  Button,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid"; // Keeping solid icons for uniformity
import {
  convertTo12HourFormat,
  formatDate,
} from "../../utils/date_time_format";
import { Link } from "react-router-dom";
import { capitalizeWords } from "../../utils/array_funcs";
import { MapPinIcon } from "@heroicons/react/16/solid";
import {
  CalendarDateRangeIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function MyEventDetails({ event }) {
  const { event: myevent, attendee } = event;
  console.log(event);

  return (
    <Card className="w-full rounded my-2 shadow-xl">
  <List className="flex flex-col  sm:flex-row items-center md:items-start justify-center space-y-4 sm:space-y-0">
    <div className=" h-28 border-2 rounded overflow-hidden">
      <img
        className="flex items-center justify-center w-full rounded border-2 h-full"
        src={myevent?.thumbnail}
        variant="square"
        alt="event_image"
      />
    </div>

    <ListItem className="flex flex-col items-start w-full">
      <div>
        <Typography
          className="font-sans italic text-cyan-800"
          variant="h5"
          color="gray-600"
        >
          {capitalizeWords(myevent.name)}
        </Typography>
      </div>
      <div className="flex flex-col sm:flex-row w-full sm:items-center space-y-2 sm:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Typography
            variant="small"
            color="gray"
            className="italic font-normal border-r-2 pr-2 border-none md:border-gray-700"
          >
            <UserIcon className="size-4 inline-block mr-1 text-blue-600" /> Organized by {capitalizeWords(attendee.user.first_name)} {capitalizeWords(attendee.user.last_name)}
          </Typography>
          <Typography className="flex flex-col md:flex-row items-start gap-2 mx-0 md:mx-2" variant="small">
            <span className="font-extralight flex md:border-r-2 pr-2 border-none md:border-gray-800 items-center justify-center">
              <ClockIcon className="size-4 inline-block mr-2 border-none md:text-cyan-700" />
              {convertTo12HourFormat(myevent.time)}
            </span>
            <span className="flex items-center justify-center">
              <CalendarDateRangeIcon className="size-4 inline-block mr-2 text-green-600" />
              {formatDate(myevent.date)}
            </span>
          </Typography>
        </div>
      </div>
      <div className="flex items-center mt-2">
        <MapPinIcon className="size-4 text-blue-600 mr-2" />
        {myevent.location}
      </div>
    </ListItem>
  </List>
</Card>

  );
}
