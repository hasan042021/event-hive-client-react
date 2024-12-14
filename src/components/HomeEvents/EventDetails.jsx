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
    thumbnail_url,
    category,
    organizer,
    name,
    description,
    tags,
    time,
    date,
  } = event;
  const state = useSelector((state) => state);
  const truncatedDescription = description.split(" ").slice(0, 150).join(" ");
  return (
    <Card className="w-full max-w-screen-md rounded-lg my-3 shadow-lg border border-gray-300 bg-white overflow-hidden mx-auto ">
  <List>
    <ListItem className="flex flex-col items-start space-y-3">
      {/* Event Name */}
      <Typography
        className="font-serif text-lg text-[#1A1A4D] tracking-wide"
        variant="h6"
      >
        {capitalizeWords(name)}
      </Typography>

      {/* Organizer and Details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full space-y-2 sm:space-y-0">
        <div className="flex items-center space-x-4">
          {/* Organizer */}
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-2 text-[#4A4A4A] border-r pr-3 border-gray-300"
          >
            <UserIcon className="h-4 w-4 text-[#008080]" />
            {capitalizeWords(organizer.user.first_name)} {capitalizeWords(organizer.user.last_name)}
          </Typography>

          {/* Time */}
          <Typography
            variant="small"
            color="gray"
            className="flex items-center gap-2 text-[#4A4A4A]"
          >
            <ClockIcon className="h-4 w-4 text-[#008080]" />
            {convertTo12HourFormat(time)}
          </Typography>
        </div>

        {/* Date */}
        <Typography
          variant="small"
          color="gray"
          className="flex items-center gap-2 text-[#4A4A4A]"
        >
          <CalendarDateRangeIcon className="h-4 w-4 text-[#008080]" />
          {formatDate(date)}
        </Typography>
      </div>

      {/* Category and Tags */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full space-y-2 sm:space-y-0">
        <Typography
          variant="small"
          color="gray"
          className="text-sm text-[#4A4A4A]"
        >
          <span className="font-semibold text-[#5B2C6F]">Category:</span> {capitalizeWords(category.name)}
        </Typography>
        <Typography
          variant="small"
          color="gray"
          className="flex items-center flex-wrap gap-1"
        >
          <span className="font-semibold text-[#5B2C6F]">Tags:</span>
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-1 py-0.5 bg-[#E0F7FA] text-[#00695C] rounded-full text-xs"
            >
              {capitalizeWords(tag.name)}
            </span>
          ))}
        </Typography>
      </div>

      {/* Divider */}
      <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>

      {/* Description */}
      <Typography
        variant="body2"
        color="gray"
        className="text-sm text-[#4A4A4A] leading-tight tracking-normal"
      >
        {truncatedDescription}...
      </Typography>

      {/* Action Button */}
      {state?.auth?.user?.role !== "organizer" && state.auth.user && (
        <div className="flex justify-center sm:justify-end w-full">
          <Button
            size="sm"
            className="capitalize rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-white font-medium hover:shadow-md"
          >
            <Link
              className="font-bold text-white hover:text-white"
              to={`attendee/events/${id}`}
            >
              See Details
            </Link>
          </Button>
        </div>
      )}
    </ListItem>
  </List>
</Card>






  );
}
