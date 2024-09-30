import MyEvents from "../pages/attendee/MyEvents";
import UpdateProfile from "../pages/attendee/UpdateProfile";
import Attendees from "../pages/organizer/Attendees";
import CreateEvent from "../pages/organizer/CreateEvent";
import UpdateEvent from "../pages/organizer/UpdateEvent";
import SingleEvent from "../pages/attendee/SingleEvent";
import Dashboard from "../pages/organizer/Dashboard";

export const attendeePrivateRoutes = [
  {
    path: "events/:eventId",
    name: "Events",
    component: SingleEvent,
  },
  {
    path: "myevents",
    name: "My Events",
    component: MyEvents,
  },
  {
    path: "profile",
    name: "Update Details",
    component: UpdateProfile,
  },
];

export const organizerPrivateRoutes = [
  {
    path: "create-event",
    name: "Create Event",
    component: CreateEvent,
  },
  {
    path: "profile",
    name: "Update Details",
    component: UpdateProfile,
  },
  {
    path: "update-event/:eventId",
    name: "Update Event",
    component: UpdateEvent,
  },
  {
    path: "attendees/:eventId",
    name: "Event Attendees",
    component: Attendees,
  },
  {
    path: "created-events",
    name: "Created Events",
    component: Dashboard,
  },
];
