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
import { capitalizeWords, findRSVP } from "../../utils/array_funcs";
import SingleEventSkeleton from "../../components/skeletons/SingleEventSkeleton";
import {
  CalendarDateRangeIcon,
  ClockIcon,
  DocumentIcon,
  DocumentTextIcon,
  MapIcon,
  TagIcon,
  UserGroupIcon,
  UserIcon,
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
            ? "You are going to attend this event"
            : "You have declined the invitation"
        );
      }
    }
  }, [rsvp, eventId, user_id]);
  console.log(event);

  const handleAccept = async () => {
    // Optimistically update the UI
    setFound(true);
    setStatus("You are going to attend this event");

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
        <div className="flex flex-col items-center justify-start px-2">
          <Card className="w-full rounded-2xl max-w-[40rem] flex flex-col m-2 border-2 bg-opacity-70 backdrop-blur-md bg-white/50 shadow-lg hover:shadow-xl transition-shadow  overflow-hidden">
            <CardHeader
              shadow={false}
              floated={false}
              className="relative m-0 w-full min-h-[50vh] max-h-[60vh] shrink-0 rounded-t rounded-r-none rounded-t-none rounded-l-none overflow-hidden"
            >
              {/* Image */}
              <img
                src={
                  event?.thumbnail_url
                    ? event?.thumbnail_url
                    : "https://img.freepik.com/free-vector/image-upload-concept-landing-page_23-2148317961.jpg?t=st=1734426852~exp=1734430452~hmac=bfa99c8718fb7919abdcc0c187daf3f49aa57b57cbdf9c27390250bd18be018f&w=900"
                }
                alt="card-image"
                className="h-full w-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute bottom-4 left-4">
                <Typography
                  variant="lead"
                  className="text-gray-600 bg-cyan-100 p-2 rounded-full text-xs whitespace-nowrap"
                >
                  <span className="font-semibold text-cyan-700">
                    {event?.category?.name}
                  </span>
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="text-start p-4 md:p-8 flex-1">
              <div className="mb-3">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="mb-0 pb-0 capitalize  font-bold text-black"
                >
                  {event?.name}
                </Typography>
                <Typography
                  className="flex items-center gap-2  text-gray-700"
                  variant="p"
                >
                  {event?.location}
                </Typography>
              </div>
              <div className="flex flex-row my-4 gap-5  md:gap-10 items-start ">
                <div className="flex flex-col  gap-2 items-start mb-2 md:mb-0 ">
                  <Typography variant="h6" className="mb-0 pb-0 text-black">
                    Time
                  </Typography>
                  <div className="flex flex-row items-center justify-start gap-2 text-gray-700">
                    <ClockIcon className="text-gray-700 h-4" />

                    <small>{convertTo12HourFormat(event?.time)}</small>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start ">
                  <Typography variant="h6" className="text-black">
                    Date
                  </Typography>
                  <div className="flex items-center gap-2 text-green-600">
                    <CalendarDateRangeIcon className="h-4 " />
                    <small>{formatDate(event?.CurRsvpdate)}</small>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap my-4 items-center gap-2">
                <TagIcon className="h-4 w-4 text-blue-600" />
                {event?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium transition-all duration-200 hover:bg-blue-200"
                  >
                    {capitalizeWords(tag?.name)}
                  </span>
                ))}
              </div>
              <div className="my-4">
                <Typography
                  variant="h6"
                  color="blue-gray"
                  className="font-semibold flex items-center gap-1"
                >
                  <DocumentTextIcon className="h-4 text-blue-700" /> Description
                </Typography>

                <Typography variant="p" className="font-normal text-start">
                  {event?.description}
                </Typography>
              </div>

              <div>
                <Typography className="text-black" variant="h6">
                  Creator
                </Typography>
                <div
                  color="gray"
                  className="mb-4 capitalize flex items-center justify-start gap-1 text-center md:text-left text-blue-gray-600"
                >
                  <UserIcon className="h-4 text-gray-700" />
                  <Typography variant="p" className="text-gray-700">
                    {event?.organizer.user.first_name}{" "}
                    {event?.organizer.user.last_name}
                  </Typography>
                </div>
              </div>
              <div>
                <small className="flex items-center text-gray-700 ">
                  <span className="bg-blue-200  text-white p-2 py-1 mr-2 rounded-full">
                    +{event?.attendee_count}
                  </span>
                  {"  "} persons are going.
                </small>
              </div>
              <div className="my-6">
                {!found ? (
                  <div className="flex items-center justify-center gap-6">
                    <Typography
                      variant="small"
                      className="flex items-center gap-2 cursor-pointer bg-green-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
                      onClick={handleAccept}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="white"
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
                      className="flex items-center gap-2 cursor-pointer bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all"
                      variant="small"
                      onClick={handleCancel}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="white"
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
                  <Typography
                    variant="p"
                    className=" p-1 rounded italic font-sans "
                  >
                    {status}
                  </Typography>
                )}
              </div>
            </CardBody>
          </Card>
        </div>
      )}
    </Layout>
  );
}
