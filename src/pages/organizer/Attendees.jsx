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
import AttendeesSkeleton from "../../components/skeletons/AttendeesSkeleton";

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
      <Card className="m-auto shadow-none mt-5 w-4/5 overflow-hidden">
        {isLoading ? (
          <div className="">
            <AttendeesSkeleton />
          </div>
        ) : rsvps?.length == 0 ? (
          <div className="h-[80vh] flex flex-col items-center justify-center">
            <img src={noAttendee} className="w-1/4" alt="" />
            <Typography variant="h4">No One Accepted it yet</Typography>
          </div>
        ) : (
          <>
            <Typography
              className=" bg-gradient-to-br from-blue-500 to-purple-700 text-white"
              variant="h6"
              color="blue-gray"
            >
              Attendees of the event
            </Typography>
            <hr />
            <List>
              {rsvps?.map((r, idx) => (
                <ListItem
                  className="flex flex-col md:flex-row items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-all"
                  key={idx}
                >
                  <ListItemPrefix>
                    <Avatar
                      variant="circular"
                      alt={`${r?.attendee.user.first_name} ${r?.attendee.user.last_name}`}
                      src={r?.attendee.image}
                      className="w-16 h-16 border-2 border-blue-500 shadow-md"
                    />
                  </ListItemPrefix>
                  <div className="text-center md:text-left">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="text-lg font-semibold"
                    >
                      {r?.attendee.user.first_name} {r?.attendee.user.last_name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-sm font-normal"
                    >
                      {r?.attendee.user.email}
                    </Typography>
                  </div>
                </ListItem>
              ))}
              {rsvps?.length < count && (
                <ListItem className="w-full">
                  <Typography className="w-full text-center text-sm text-gray-600 italic p-4">
                    Oops! {count - rsvps?.length} users have deleted their
                    account.
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
