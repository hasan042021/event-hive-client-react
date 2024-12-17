import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/16/solid";
import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
  Button,
  CardBody,
  Chip,
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
  CalendarIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

export default function OrganizersEventDetails({ event }) {
  const [deleteEvent] = useDeleteEventMutation();
  const { id, thumbnail_url, name, description, time, date, attendee_count } =
    event;

  const handleDelete = (e, id) => {
    deleteEvent(id);
  };

  return (
    <div className=" md:w-4/6 p-2">
      <Card className=" container  max-w-4xl my-4 overflow-hidden">
        <CardBody className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Thumbnail */}
            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={thumbnail_url}
                alt={name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Link
                state={{ count: attendee_count }}
                to={`/organizer/attendees/${id}`}
              >
                <Chip
                  value={`${attendee_count} Attendees`}
                  className="absolute bottom-2 left-2 text-blue-500 bg-white/80 backdrop-blur-sm"
                  icon={<UserIcon className="h-4 w-4" />}
                ></Chip>
              </Link>
            </div>

            {/* Event Details */}
            <div className="md:w-2/3 p-6 flex flex-col justify-between">
              <div>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {name}
                </Typography>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Chip
                    value={convertTo12HourFormat(time)}
                    className="bg-blue-gray-50 text-blue-gray-700"
                    icon={<ClockIcon className="h-4 w-4" />}
                  />
                  <Chip
                    value={formatDate(date)}
                    className="bg-blue-gray-50 text-blue-gray-700"
                    icon={<CalendarIcon className="h-4 w-4" />}
                  />
                </div>
                <Typography variant="paragraph" color="gray" className="mb-4">
                  {description.split(" ").slice(0, 15).join(" ")}...
                </Typography>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <Button size="sm" variant="outlined" color="blue">
                  <Link
                    className="flex items-center gap-2"
                    to={`/organizer/update-event/${id}`}
                  >
                    <PencilIcon className="h-4 w-4" /> Update Event
                  </Link>
                </Button>
                <Button
                  size="sm"
                  color="red"
                  className="flex items-center gap-2"
                  onClick={(e) => handleDelete(e, id)}
                >
                  <TrashIcon className="h-4 w-4" /> Delete Event
                </Button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
