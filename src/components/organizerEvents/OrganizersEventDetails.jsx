import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import {
  convertTo12HourFormat,
  formatDate,
} from "../../utils/date_time_format";
import { useDeleteEventMutation } from "../../features/events/eventsApi";
import {
  UserIcon,
  CalendarDateRangeIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

export default function OrganizersEventDetails({ event }) {
  const [deleteEvent] = useDeleteEventMutation();
  const { id, thumbnail_url, name, description, time, date, attendee_count } =
    event;

  const handleDelete = (e, id) => {
    deleteEvent(id);
  };

  return (
    <Card className="w-4/5 rounded my-2 shadow-xl">
      <div className="flex flex-row items-center justify-between p-2">
        {/* Thumbnail Image */}
        <div className="flex  justify-start items-center">
          <div className="flex items-center justify-center mr-3">
            <div className="w-28 h-28 border-2 rounded overflow-hidden">
              <img
                className=" object-cover w-full h-full rounded "
                src={thumbnail_url}
                alt={name}
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="flex flex-col items-start">
            <div>
              <Typography
                className="font-sans italic text-cyan-800"
                variant="h5"
                color="gray-600"
              >
                {name}
              </Typography>
            </div>
            <div className="flex">
              <div>
                <Typography
                  variant="small"
                  color="gray"
                  className="italic font-normal border-r-2 pr-2 border-gray-700"
                >
                  <Link
                    state={{ count: attendee_count }}
                    to={`/organizer/attendees/${id}`}
                  >
                    <UserIcon className="size-4 inline-block mr-1 text-blue-600" />
                    Total Attendees: {attendee_count}
                  </Link>{" "}
                </Typography>
              </div>
              <div>
                <Typography className="flex gap-2 mx-2" variant="small">
                  <span className="font-extralight flex border-r-2 pr-2 border-gray-800 items-center justify-center">
                    <ClockIcon className="size-4 inline-block mr-2 text-cyan-700" />
                    {convertTo12HourFormat(time)}
                  </span>
                  <span className="flex items-center justify-center">
                    <CalendarDateRangeIcon className="size-4 inline-block mr-2 text-green-600" />
                    {formatDate(date)}
                  </span>
                </Typography>
              </div>
            </div>
            <div>
              <Typography className="text-start" variant="small">
                {description.split(" ").slice(0, 10).join(" ")}...
              </Typography>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col items-center justify-between mt-2">
            <Button
              size="sm"
              variant="outlined"
              className="capitalize rounded-full border-blue-600 text-blue-600 hover:bg-blue-50 m-1"
            >
              <Link
                className="text-blue-600 hover:text-blue-700"
                to={`/organizer/update-event/${id}`}
              >
                Update Event
              </Link>
            </Button>
            <Button
              size="sm"
              color="red"
              className="capitalize rounded-full text-white bg-red-600 hover:bg-red-700 m-1"
              onClick={(e) => handleDelete(e, id)}
            >
              Delete Event
            </Button>
          </div>
        </div>
      </div>
      {/* Buttons as another ListItem */}
    </Card>
  );
}
