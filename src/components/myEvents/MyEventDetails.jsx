import {
  Avatar,
  Button,
  Card,
  CardBody,
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
    <div className=" md:w-4/6 ">
      <Card className=" container  max-w-4xl my-2 overflow-hidden">
        <CardBody className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnail Section */}

            <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
              <img
                src={myevent?.thumbnail}
                alt="event_image"
                className="inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div className="flex flex-col items-start w-full">
                {/* Event Name */}
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {capitalizeWords(myevent.name)}
                </Typography>

                {/* Organizer, Time, and Date */}

                <div className="flex flex-col items-start justify-start space-y-2  ">
                  {/* Organizer */}
                  <Typography
                    variant="small"
                    color="gray"
                    className="italic font-normal border-r-2 pr-2 border-none md:border-gray-700"
                  >
                    <UserIcon className="h-5 w-5 inline-block mr-1 text-blue-600" />
                    Organized by {capitalizeWords(attendee.user.first_name)}{" "}
                    {capitalizeWords(attendee.user.last_name)}
                  </Typography>

                  {/* Time & Date */}
                  <Typography
                    className="flex flex-col md:flex-row justify-between  items-start gap-2 mx-0 mr-2"
                    variant="small"
                  >
                    <div className="font-extralight  flex md:border-r-2 pr-2 border-none md:border-gray-800 items-center justify-center">
                      <ClockIcon className="h-5 w-5 inline-block mr-2 border-none md:text-cyan-700" />
                      {convertTo12HourFormat(myevent.time)}
                    </div>
                    <div className="flex items-center justify-center">
                      <CalendarDateRangeIcon className="h-5 w-5 inline-block mr-2 text-green-600" />
                      {formatDate(myevent.date)}
                    </div>
                  </Typography>
                  <div className="flex items-center mt-2">
                    <MapPinIcon className="h-5 w-5 text-blue-600 mr-2" />
                    {myevent.location}
                  </div>
                </div>

                {/* Location */}
              </div>
            </div>

            {/* Event Details Section */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
