import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  useGetAttendeeRSVPsQuery,
  useGetRSVPbyEventQuery,
} from "../../features/RSVP/rsvpApi";
import Layout from "../../components/common/Layout";
import {
  Avatar,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import noAttendee from "../../assets/images/no_attendee.svg";
import EventListSkeleton from "../../components/skeletons/EventListSkeleton";

export default function Attendees() {
  const { eventId } = useParams();
  const [now, setNow] = useState(false);
  useEffect(() => {
    if (eventId) setNow(true);
  }, [eventId]);
  const { data: rsvps, isLoading } = useGetRSVPbyEventQuery(
    { id: eventId },
    { skip: !now }
  );
  useEffect(() => {
    console.log(rsvps);
  }, [rsvps]);
  const location = useLocation();
  console.log(location);
  const { count } = location?.state;

  return (
    <Layout>
      <Card className="m-auto shadow-none mt-5 w-4/5">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center">
            <EventListSkeleton />
          </div>
        ) : rsvps?.length == 0 ? (
          <div className="h-[80vh] flex flex-col items-center justify-center">
            <img src={noAttendee} className="w-1/4" alt="" />
            <Typography variant="h4">No One Accepted it yet</Typography>
          </div>
        ) : (
          <>
            <Typography variant="h6" color="blue-gray">
              Attendees of the event
            </Typography>
            <hr />
            <List >
              {rsvps?.map((r, idx) => (
                <ListItem className="flex md:flex-row flex-col border-gray-100" key={idx}>
                  <ListItemPrefix >
                    <Avatar
                      variant="circular"
                      alt="candice"
                      src={r?.attendee.image}
                    />
                  </ListItemPrefix>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      {r?.attendee.user.first_name} {r?.attendee.user.last_name}
                    </Typography>

                    <Typography
                      variant="small"
                      color="gray"
                      className="font-normal"
                    >
                      {r?.attendee.user.email}
                    </Typography>
                  </div>
                </ListItem>
              ))}
              {rsvps?.length < count && (
                <ListItem className="w-full">
                  <Typography className="w-full flex items-center justify-center">
                    Oops!! Looks like {count - rsvps?.length} users has deleted
                    their account.
                  </Typography>
                </ListItem>
              )}
            </List>
          </>
        )}
      </Card>
    </Layout>
  );
}
