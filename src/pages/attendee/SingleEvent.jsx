import React, { useEffect, useState } from "react";
import {
  useGetEventQuery,
  useUpdateEventMutation,
} from "../../features/events/eventsApi";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import Layout from "../../components/common/Layout";
import {
  useCreateRSVPMutation,
  useGetCurrentEventRSVPQuery,
  useGetRSVPsQuery,
} from "../../features/RSVP/rsvpApi";
import { useSelector } from "react-redux";
import { findRSVP } from "../../utils/array_funcs";
import SingleEventSkeleton from "../../components/skeletons/SingleEventSkeleton";
import {
  CalendarDateRangeIcon,
  ClockIcon,
  DocumentIcon,
  DocumentTextIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import {
  convertTo12HourFormat,
  formatDate,
} from "../../utils/date_time_format";

export default function SingleEvent() {
  const { eventId } = useParams();
  const { data: event } = useGetEventQuery(eventId);
  const [updateEvent] = useUpdateEventMutation();
  const [createRSVP] = useCreateRSVPMutation();
  const [found, setFound] = useState(false);
  const [status, setStatus] = useState();

  const { id: user_id } = useSelector((state) => state.auth.user);
  const { data: rsvp } = useGetRSVPsQuery();
  const { data: CurRsvp, isLoading } = useGetCurrentEventRSVPQuery({
    event_id: eventId,
    attendee_id: user_id,
  });

  useEffect(() => {
    if (rsvp?.length > 0 && eventId && user_id) {
      const foundRSVP = findRSVP(rsvp, Number(eventId), user_id);
      if (foundRSVP) {
        setFound(true);
        setStatus(
          foundRSVP.is_accepted
            ? "You have accepted it already"
            : "You have declined the invitation"
        );
      }
    }
  }, [rsvp, eventId, user_id]);
  console.log(event);

  const handleAccept = async () => {
    // Optimistically update the UI
    setFound(true);
    setStatus("You have accepted it already");

    const body = { id: event.id, data: { attendee_count: 1 } };
    await updateEvent(body).unwrap(); // use unwrap to handle the promise

    const body2 = { event: eventId, attendee: user_id, is_accepted: true };
    await createRSVP(body2).unwrap(); // use unwrap to handle the promise
  };

  const handleCancel = async () => {
    // Optimistically update the UI
    setFound(true);
    setStatus("You have declined the invitation");

    const body2 = { event: eventId, attendee: user_id, is_declined: true };
    await createRSVP(body2).unwrap(); // use unwrap to handle the promise
  };

  return (
    <Layout>
  {isLoading ? (
    <SingleEventSkeleton />
  ) : (
    <div className="flex flex-col items-center justify-start p-2">
      <Card className="w-full max-w-[48rem] flex flex-col md:flex-row m-2 border-2">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-full md:w-2/5 shrink-0 rounded-t md:rounded-r-none md:rounded-t-none"
        >
          <img
            src={event?.thumbnail_url}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody className="text-start p-4 flex-1">
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-2 capitalize text-center md:text-left"
          >
            {event?.name}
          </Typography>
          <Typography
            variant="h6"
            color="gray"
            className="mb-2 capitalize text-center md:text-left"
          >
            Organized by {event?.organizer.user.first_name} {event?.organizer.user.last_name}
          </Typography>
          <div className="flex flex-col md:flex-row md:gap-4 items-center md:items-start">
            <Typography className="flex gap-2 items-center mb-2 md:mb-0" variant="h6">
              <span className="flex items-center gap-2">
                <ClockIcon className="h-4 text-cyan-700" />
                {convertTo12HourFormat(event?.time)}
              </span>
            </Typography>
            <Typography className="flex gap-2 items-center" variant="h6">
              <span className="flex items-center gap-2">
                <CalendarDateRangeIcon className="h-4 text-green-600" />
                {formatDate(event?.CurRsvpdate)}
              </span>
            </Typography>
          </div>
          <Typography className="flex items-center gap-2 mt-2" variant="h6">
            <MapIcon className="h-4 text-blue-600" /> {event?.location}
          </Typography>
          <Typography color="gray" className="font-normal my-2">
            <span className="bg-teal-600 rounded p-1 text-white">
              {event?.category?.name}
            </span>
          </Typography>
          <Typography className="flex flex-wrap gap-2">
            {event?.tags?.map((tag) => (
              <Chip
                key={tag.id}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                value={tag?.name}
              />
            ))}
          </Typography>
          <div className="my-4">
            {!found ? (
              <div className="flex items-center justify-center gap-5">
                <Typography
                  variant="small"
                  className="flex items-center gap-2 cursor-pointer"
                  color="blue-gray"
                  onClick={handleAccept}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="green"
                    className="h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Accept
                </Typography>
                <Typography
                  className="flex items-center gap-2 cursor-pointer"
                  variant="small"
                  color="gray"
                  onClick={handleCancel}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="red"
                    className="h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Decline
                </Typography>
              </div>
            ) : (
              <div className="bg-deep-orange-100 p-1 rounded text-black italic font-sans">
                {status}
              </div>
            )}
          </div>
        </CardBody>
      </Card>
      <Card className="border-2 w-full max-w-[48rem] p-5 m-2 shadow-xl">
        <Typography
          variant="h6"
          color="gray"
          className="font-normal flex items-center gap-2"
        >
          <DocumentTextIcon className="h-6" /> Description
        </Typography>
        <div className="h-0.5 w-28 bg-teal-800 my-2"></div>
        <Typography color="gray" className="font-normal text-start">
          {event?.description}
        </Typography>
      </Card>
    </div>
  )}
</Layout>

  );
}
