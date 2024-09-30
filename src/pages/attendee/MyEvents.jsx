import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAttendeeRSVPsQuery } from "../../features/RSVP/rsvpApi";
import Layout from "../../components/common/Layout";
import Events from "../../components/HomeEvents/Events";
import MyEventsList from "../../components/myEvents/MyEventsList";

export default function MyEvents() {
  const { id } = useSelector((state) => state.auth.user);
  const [now, setNow] = useState(false);
  const [data, SetData] = useState({});
  useEffect(() => {
    setNow(true);
    SetData({ id });
  }, [id]);

  const { data: rsvps } = useGetAttendeeRSVPsQuery(data, { skip: !now });

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <MyEventsList events={rsvps} />
      </div>
    </Layout>
  );
}
