import React from "react";
import { useGetEventsQuery } from "../../features/events/eventsApi"; // Adjust the path as necessary
import { useGetRSVPsQuery } from "../../features/RSVP/rsvpApi"; // Adjust the path as necessary
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import Layout from "../../components/common/Layout";
import {
  convertTo12HourFormat,
  formatDate,
} from "../../utils/date_time_format";
import notFoundImg from "../../assets/images/undraw_empty_re_opql.svg";
import EventListSkeleton from "../../components/skeletons/EventListSkeleton";

const RSVPs = () => {
  const location = useLocation();
  const { data } = location.state;

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        {data.length === 0 ? (
          <div className="h-[100vh] flex-col flex items-center justify-center">
            <img src={notFoundImg} className="w-80" alt="" />
            <Typography variant="h6">No Remaining RSVPS to Act</Typography>
          </div>
        ) : (
          <>
            <Card
              style={{ backgroundColor: "rgb(11,161,233)" }}
              className="p-2  text-white rounded mt-2 w-96"
            >
              <Typography variant="h6">
                RSVP Requests You Have Not Acted On Yet
              </Typography>
            </Card>
            {data?.map((event) => (
              <Card
                key={event.id}
                className="w-full max-w-[48rem] m-2 shadow-lg rounded-lg"
              >
                <List>
                  <ListItem className="border flex items-center justify-between">
                    <ListItemPrefix>
                      <Avatar
                        size="xl"
                        variant="rounded"
                        src={event.thumbnail}
                      />
                    </ListItemPrefix>
                    <div className="flex-grow mx-4">
                      <Typography
                        className="font-bold text-cyan-800"
                        variant="h6"
                        color="gray-600"
                      >
                        {event.name}
                      </Typography>
                      <Typography
                        variant="small"
                        color="gray"
                        className="italic font-normal"
                      >
                        Organized by: {event.organizer.user.first_name}{" "}
                        {event.organizer.user.last_name}
                      </Typography>
                    </div>
                    <div className="flex flex-col items-end mx-2">
                      <Typography variant="small" color="gray">
                        {convertTo12HourFormat(event.time)}
                      </Typography>
                      <Typography variant="small" color="gray">
                        {formatDate(event.date)}
                      </Typography>
                    </div>
                    <div>
                      <Button
                        size="sm"
                        color="blue"
                        className="capitalize rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      >
                        <Link
                          className="text-white font-bold hover:text-white"
                          to={`/attendee/events/${event.id}`}
                        >
                          See Details
                        </Link>
                      </Button>
                    </div>
                  </ListItem>
                </List>
              </Card>
            ))}
          </>
        )}
      </div>
    </Layout>
  );
};

export default RSVPs;
