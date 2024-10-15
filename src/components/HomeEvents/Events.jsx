import React, { useEffect } from "react";
import { useGetEventsQuery } from "../../features/events/eventsApi";
import EventDetails from "./EventDetails";
import { Card, List, Typography } from "@material-tailwind/react";
import notFoundImg from "../../assets/images/undraw_empty_re_opql.svg";

export default function Events({ events }) {
  useEffect(() => {
    console.log(events);
  }, [events]);
  return (
    <>
      {events?.length == 0 ? (
        <div className="h-[100vh] flex-col flex items-center justify-center">
          <img src={notFoundImg} className="w-80" alt="" />
          <Typography variant="h6">No Data Found</Typography>
        </div>
      ) : (
        events?.map((event) => <EventDetails event={event} />)
      )}
    </>
  );
}
