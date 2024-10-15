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
import { useDeleteEventMutation } from "../../features/events/eventsApi";
export default function OrganizersEventDetails({ event }) {
  const [deleteEvent, {}] = useDeleteEventMutation();
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
    attendee_count,
  } = event;
  console.log(event);
  const handleDelete = (e, id) => {
    deleteEvent(id);
  };
  return (
    <Card className="w-3/4 my-2">
      <List>
        <ListItem className="border flex items-center justify-between">
          <ListItemPrefix>
            <Avatar variant="circular" alt="candice" src={thumbnail} />
          </ListItemPrefix>
          <div>
            <Typography className="font-bold" variant="h6" color="gray-600">
              {name}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="italic font-normal"
            >
              <Link
                state={{ count: attendee_count }}
                to={`/organizer/attendees/${id}`}
              >
                {" "}
                Total Attendees: {attendee_count}
              </Link>
            </Typography>
          </div>
          <div>
            <Typography variant="outline">
              ({convertTo12HourFormat(time)})<span>{formatDate(date)}</span>
            </Typography>
          </div>
          <div>
            <Button
              size="sm"
              variant="outlined"
              className="capitalize  rounded-full m-1"
            >
              <Link className="text-black" to={`/organizer/update-event/${id}`}>
                Update Event
              </Link>
            </Button>
            <Button
              size="sm"
              color="red"
              className="capitalize  rounded-full text-white"
              onClick={(e) => handleDelete(e, id)}
            >
              Delete Event
            </Button>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}
