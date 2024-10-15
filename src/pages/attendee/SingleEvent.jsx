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

export default function SingleEvent() {
  const { eventId } = useParams();

  const { data: event } = useGetEventQuery(eventId);
  const [updateEvent] = useUpdateEventMutation();
  const [createRSVP] = useCreateRSVPMutation();
  const [now, setNow] = useState(false);
  const [params, setParams] = useState({});
  const [status, setStatus] = useState();

  const { id: user_id } = useSelector((state) => state.auth.user);
  const { data: rsvp } = useGetRSVPsQuery();
  useEffect(() => {
    if (eventId && user_id) {
      setNow(true);
      console.log(eventId, user_id);
    }
  }, [eventId, user_id]);
  const [found, setFound] = useState(false);
  const [reload, setReload] = useState(false);

  const { data: CurRsvp } = useGetCurrentEventRSVPQuery({
    event__id: eventId,
    attendee__id: user_id,
  });

  useEffect(() => {
    console.log(CurRsvp);
  }, [CurRsvp]);

  useEffect(() => {
    if (rsvp?.length > 0 && eventId && user_id) {
      console.log(rsvp.length, eventId, user_id);
      const foundRSVP = findRSVP(rsvp, Number(eventId), user_id);

      if (foundRSVP) {
        setFound(true);
        if (foundRSVP.is_accepted) setStatus("You have accepted it already");
        else setStatus("You have declined the invitation");
      }
    }
  }, [rsvp, eventId, user_id]);
  useEffect(() => {
    if (reload) window.location.reload();
  }, [reload]);

  const handleAccept = () => {
    const body = { id: event.id, data: { attendee_count: 1 } };
    updateEvent(body);
    const body2 = { event: eventId, attendee: user_id, is_accepted: true };
    createRSVP(body2);
    setReload(true);
    //
  };
  const handleCancel = () => {
    const body2 = { event: eventId, attendee: user_id, is_declined: true };
    createRSVP(body2);
    setReload(true);
    //
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <Card className="w-full max-w-[48rem] flex-row m-2">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
          >
            <img
              src={event?.thumbnail}
              alt="card-image"
              className="h-full w-full object-cover"
            />
          </CardHeader>
          <CardBody>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              {event?.organizer.user.first_name}{" "}
              {event?.organizer.user.last_name}
            </Typography>
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {event?.name}
            </Typography>
            <Typography color="gray" className="font-normal">
              {event?.category?.name}
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              {event?.description}
            </Typography>
            <Typography>
              {event?.tags?.map((tag) => (
                <Chip className="inline-block m-1" value={tag?.name} />
              ))}
            </Typography>
            <a href="#" className="inline-block">
              <Button variant="text" className=" flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </a>
            <div className="">
              {!found ? (
                <>
                  <Typography
                    variant="small"
                    className="flex items-end justify-center cursor-pointer"
                    color="blue-gray"
                    onClick={handleAccept}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="green"
                      class="size-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    accept
                  </Typography>
                  <Typography
                    className="flex items-end justify-center font-normal cursor-pointer"
                    variant="small"
                    color="gray"
                    onClick={handleCancel}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="red"
                      class="size-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    decline
                  </Typography>
                </>
              ) : (
                <>{status}</>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}
