import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAttendeeRSVPsQuery } from "../../features/RSVP/rsvpApi";
import Layout from "../../components/common/Layout";
import Events from "../../components/HomeEvents/Events";
import MyEventsList from "../../components/myEvents/MyEventsList";
import EventsSkeleton from "../../components/skeletons/EventsSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import EventListSkeleton from "../../components/skeletons/EventListSkeleton";
export default function MyEvents() {
  const user = useSelector((state) => state.auth.user);

  const { data: rsvps, isLoading } = useGetAttendeeRSVPsQuery(
    { id: user?.id },
    {
      skip: !user?.id,
    }
  );
  useEffect(() => {
    console.log(rsvps);
  }, [rsvps]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        {isLoading ? <EventListSkeleton /> : <MyEventsList events={rsvps} />}
      </div>
    </Layout>
  );
}
