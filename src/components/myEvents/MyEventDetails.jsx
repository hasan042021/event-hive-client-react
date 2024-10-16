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
      <List className="flex flex-row items-start justify-center">
        <div>
          <img
            className="flex items-center justify-center w-28 rounded border-2 h-full"
            src={myevent.thumbnail}
            variant="square"
          />
        </div>

        <ListItem className="flex flex-col items-start">
          <div>
            <Typography
              className="font-sans italic text-cyan-800"
              variant="h5"
              color="gray-600"
            >
              {capitalizeWords(myevent.name)}
            </Typography>
          </div>
          <div className="flex">
            <div>
              <Typography
                variant="small"
                color="gray"
                className="italic font-normal border-r-2 pr-2 border-gray-700"
              >
                <UserIcon className="size-4 inline-block mr-1 text-blue-600" />{" "}
                {/* Keeping the original organizer info */}
                Organized by {capitalizeWords(attendee.user.first_name)}{" "}
                {capitalizeWords(attendee.user.last_name)}
              </Typography>
            </div>
            <div>
              <Typography className="flex gap-2 mx-2" variant="small">
                <span className="font-extralight flex border-r-2 pr-2 border-gray-800 items-center justify-center">
                  <ClockIcon className="size-4 inline-block mr-2 text-cyan-700" />
                  {convertTo12HourFormat(myevent.time)}
                </span>
                <span className="flex items-center justify-center">
                  <CalendarDateRangeIcon className="size-4 inline-block mr-2 text-green-600" />
                  {formatDate(myevent.date)}
                </span>
              </Typography>
            </div>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="size-4 text-blue-600" />
            {myevent.location}
          </div>
        </ListItem>
      </List>
    </Card>
  );
}
