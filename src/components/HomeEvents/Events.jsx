import React, { useEffect } from "react";
import { useGetEventsQuery } from "../../features/events/eventsApi";
import EventDetails from "./EventDetails";
import { Card, List, Typography } from "@material-tailwind/react";

export default function Events({ events }) {
  console.log(events);
  return (
    <>
      {events?.length == 0 ? (
        <Typography>No Data Found</Typography>
      ) : (
        events?.map((event) => <EventDetails event={event} />)
      )}
    </>
  );
}
