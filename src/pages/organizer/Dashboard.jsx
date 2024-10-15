import React, { useEffect, useState } from "react";
import { useGetOrganizersEventsQuery } from "../../features/events/eventsApi";
import { useSelector } from "react-redux";

import EventOrganizer from "../../components/organizerEvents/EventOrganizer";
import EventListSkeleton from "../../components/skeletons/EventListSkeleton";

export default function Dashboard() {
  const { id } = useSelector((state) => state.auth.user);
  console.log(id);
  console.log("here");
  const [now, setNow] = useState(false);

  const {
    data: events,
    isSuccess,
    isLoading,
  } = useGetOrganizersEventsQuery(id, {
    skip: !now,
  });
  useEffect(() => {
    if (id) setNow(true);
  }, [id]);
  return (
    <div>
      <EventOrganizer events={events} isLoading={isLoading} />
    </div>
  );
}
