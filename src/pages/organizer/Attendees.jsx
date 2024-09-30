import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

export default function Attendees() {
  const { eventId } = useParams();
  const [now, setNow] = useState(false);
  useEffect(() => {
    if (eventId) setNow(true);
  }, [eventId]);
  const { data: rsvps } = useGetRSVPbyEventQuery(
    { id: eventId },
    { skip: !now }
  );
  useEffect(() => {
    console.log(rsvps);
  }, [rsvps]);

  return (
    <Layout>
      <Card className="m-auto shadow-none mt-5 w-4/5">
        <Typography variant="h6" color="blue-gray">
          Attendees of the event
        </Typography>
        <hr />
        <List>
          {rsvps?.length == 0 && (
            <Typography variant="h4">No One Accepted it yet</Typography>
          )}
          {rsvps?.map((r, idx) => (
            <ListItem key={idx}>
              <ListItemPrefix>
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
        </List>
      </Card>
    </Layout>
  );
}
