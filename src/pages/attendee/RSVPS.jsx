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
      <div className="flex flex-col items-center justify-center mx-2 ">
        {data.length === 0 ? (
          <div className="h-[100vh] flex-col  flex items-center justify-center">
            <img src={notFoundImg} className="w-80" alt="" />
            <Typography variant="h6">No Remaining RSVPS to Act</Typography>
          </div>
        ) : (
          <>
            <Card
              style={{ backgroundColor: "rgb(11,161,233)" }}
              className="p-1 px-3  mx-2 text-white rounded-2xl mt-2 "
            >
              <Typography variant="p" className="font-semibold">
                RSVP Requests You Have Not Acted On Yet
              </Typography>
            </Card>
            {data?.map((event) => (
              <Card
                key={event.id}
                className="w-full max-w-[40rem] m-2 mx-2 shadow-lg rounded-lg"
              >
                <List className="p-0">
                  <ListItem className="border flex flex-col md:flex-row  md:items-center justify-between transition-all">
                    <ListItemPrefix className="p-0">
                      <img
                        src={event.thumbnail_url}
                        className="border-2 max-w-20 rounded p-0 border-blue-500 shadow-md"
                      />
                    </ListItemPrefix>
                    <div className="md:flex-grow flex-grow-0 mx-0 md:mx-4">
                      <Typography
                        className="font-bold md:text-start text-center text-cyan-800"
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
                    <div className="flex flex-col items-center md:items-end mx-0 md:mx-2">
                      <Typography className="mx-0" variant="small" color="gray">
                        {convertTo12HourFormat(event.time)}
                      </Typography>
                      <Typography className="mx-0" variant="small" color="gray">
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
