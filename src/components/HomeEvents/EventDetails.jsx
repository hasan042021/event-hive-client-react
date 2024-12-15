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
import {
  CalendarDateRangeIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
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
    <Card className="w-full max-w-screen-md rounded-2xl my-4 overflow-hidden mx-auto transition-all duration-300 hover:shadow-xl bg-white/70 backdrop-blur-sm border border-white/40 shadow-lg">
      <div className="p-6 space-y-4 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 rounded-2xl filter blur-md"></div>
        <div className="relative z-10 space-y-3">
          {/* Event Name and Category */}
          <div className="flex justify-between items-start">
            <Typography
              className="font-sans text-2xl text-gray-800 font-bold tracking-tight leading-tight flex-grow"
              variant="h5"
            >
              {capitalizeWords(name)}
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 bg-cyan-100 px-2 py-1 rounded-full text-xs whitespace-nowrap ml-2"
            >
              <span className="font-semibold text-cyan-700">
                {capitalizeWords(category.name)}
              </span>
            </Typography>
          </div>

          {/* Organizer and Details */}
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Typography
              variant="small"
              className="flex items-center gap-1 text-gray-600"
            >
              <UserIcon className="h-4 w-4 text-cyan-600" />
              <span className="font-medium">
                {capitalizeWords(organizer.user.first_name)}{" "}
                {capitalizeWords(organizer.user.last_name)}
              </span>
            </Typography>

            <Typography
              variant="small"
              className="flex items-center gap-1 text-gray-600"
            >
              <ClockIcon className="h-4 w-4 text-cyan-600" />
              <span className="font-medium">{convertTo12HourFormat(time)}</span>
            </Typography>

            <Typography
              variant="small"
              className="flex items-center gap-1 text-gray-600"
            >
              <CalendarIcon className="h-4 w-4 text-cyan-600" />
              <span className="font-medium">{formatDate(date)}</span>
            </Typography>
          </div>

          {/* Description */}
          <Typography
            variant="body2"
            className="text-sm text-gray-600 leading-relaxed tracking-normal"
          >
            {truncatedDescription}...
          </Typography>

          {/* Tags and Action Button */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <TagIcon className="h-4 w-4 text-blue-600" />
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium transition-all duration-200 hover:bg-blue-200"
                >
                  {capitalizeWords(tag.name)}
                </span>
              ))}
            </div>

            {state?.auth?.user?.role !== "organizer" && state.auth.user && (
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-1 text-white text-sm font-semibold hover:shadow-md transition-all duration-200 hover:translate-y-[-1px]"
              >
                <Link
                  className="text-white hover:text-white"
                  to={`attendee/events/${id}`}
                >
                  Explore
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
