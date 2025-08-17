import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
  Badge,
  Avatar,
} from "@material-tailwind/react";
import { Bars3Icon, PowerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApi";
import { ServerStackIcon } from "@heroicons/react/16/solid";
import { useGetEventsQuery } from "../../features/events/eventsApi";
import { useGetRSVPsQuery } from "../../features/RSVP/rsvpApi";
import Logo from "../../assets/images/logo.png";
import avatarImg from "../../assets/images/avatar.png";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function NavList({ user, handleLogout, isScrolled }) {
  const { data: events, isLoading: loadingEvents } = useGetEventsQuery(null, {
    skip: user?.role == "organizer" || !user,
  });
  const { data: rsvps, isLoading: loadingRSVPs } = useGetRSVPsQuery(null, {
    skip: user?.role == "organizer" || !user,
  });
  const userId = user?.id;
  console.log("userid", userId);

  // Get RSVP'd event IDs by the current user
  const rsvpEventIds = new Set(
    rsvps
      ?.filter((rsvp) => rsvp.attendee.id === userId)
      ?.map((rsvp) => rsvp.event.id)
  );
  console.log(rsvpEventIds);
  // Filter events to get only those not in the RSVP list
  const availableEvents = events?.filter(
    (event) => !rsvpEventIds.has(event.id)
  );
  console.log(availableEvents);
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row  items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color={isScrolled ? "blue-gray" : "white"}
        className="p-1 font-medium"
      >
        <Link className="" to="/">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color={isScrolled ? "blue-gray" : "white"}
        className="p-1 font-medium"
      >
        <Link className="" to="/events">
          Events
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color={isScrolled ? "blue-gray" : "white"}
        className="p-1 font-medium"
      >
        <Link className="" to="/about">
          About Us
        </Link>
      </Typography>
      {!user ? (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Button
              variant="text"
              size="sm"
              color="gray"
              className={`${isScrolled ? "bg-white border-gray-300 text-gray-800 hover:bg-gray-100 border" : "bg-white text-gray-800 hover:bg-gray-100 border-none"} shadow-lg`}
            >
              <Link className="" to="/login">
                Login
              </Link>
            </Button>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Button
              variant="outlined"
              size="sm"
              className="bg-cyan-500 border-none hover:bg-cyan-600 text-white shadow-lg flex items-center "
            >
              <a href="">
                <Link className="text-white hover:text-white" to="/register">
                  sign in
                </Link>
              </a>
            </Button>
          </Typography>
        </>
      ) : user?.role == "attendee" ? (
        <> 
          <Typography
            as="li"
            variant="small"
            color={isScrolled ? "blue-gray" : "white"}
            className="p-1 font-medium"
          >
            <Link to={`/attendee/myevents/`} className="flex items-center ">
              My Events
            </Link>
          </Typography>

          <Typography
            as="li"
            variant="small"
            color=""
            className="flex items-center justify-center gap-x-2 p-1 font-medium"
          >
            <Link
              to={`/${user.role}/profile/`}
              className={`flex items-center ${isScrolled ? "text-blue-600" : "text-white"} hover:text-blue-600`}
            >
              <UserCircleIcon className={`${isScrolled ? "text-blue-600" : "text-white"} size-8 border-2 rounded-full `} />
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium flex items-center justify-center"
          >
            <Link to="/attendee/rsvps" state={{ data: availableEvents }}>
              <Badge color="blue" content={availableEvents?.length}>
                <IconButton className="border shadow-xl" color={isScrolled ? "white" : "gray"}>
                  <ServerStackIcon className={`h-5 w-5 ${isScrolled ? "fill-blue-600" : "fill-white"} bg-gray-50`} />
                </IconButton>
              </Badge>
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className=" font-medium hover:text-white"
          >
            <Button
              variant="outlined"
              size="sm"
              className={`border-blue-500 font-normal p-1 px-2 ${isScrolled ? "text-blue-500 hover:bg-blue-500 hover:text-white" : "text-white hover:bg-blue-500 hover:text-white"} transition-all duration-300 flex items-center`}
              onClick={handleLogout}
            >
              <PowerIcon className={`size-4 ${isScrolled ? "text-blue-500" : "text-white"}  hover:text-white`} />
              <span className="ml-1">Logout</span>
            </Button>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            as="li"
            variant="small"
            color={isScrolled ? "blue-gray" : "white"}
            className="p-1 font-medium"
          >
            <Link
              to={`/organizer/create-event/`}
              className="flex items-center "
            >
              Create Event
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color={isScrolled ? "blue-gray" : "white"}
            className="p-1 font-medium"
          >
            <Link
              to={`/organizer/created-events/`}
              className="flex items-center "
            >
              Created Events
            </Link>
          </Typography>

          <Typography
            as="li"
            variant="small"
            color=""
            className="flex items-center justify-center gap-x-2 p-1 font-medium"
          >
            <Link
              to={`/${user.role}/profile/`}
              className={`flex items-center ${isScrolled ? "text-blue-600" : "text-white"} hover:text-blue-600`}
            >
              <UserCircleIcon className={`${isScrolled ? "text-blue-600" : "text-white"} size-8 border-2 rounded-full `} />
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Button
              variant="outlined"
              size="sm"
              className={`border-blue-500 font-normal p-1 px-2 ${isScrolled ? "text-blue-500 hover:bg-blue-500 hover:text-white" : "text-white hover:bg-blue-500 hover:text-white"} transition-all duration-300 flex items-center`}
              onClick={handleLogout}
            >
              <PowerIcon className={`size-4 ${isScrolled ? "text-blue-500" : "text-white"}  hover:text-white`} />
              <span className="ml-1">Logout</span>
            </Button>
          </Typography>
        </>
      )}
    </ul>
  );
}

export default function NavbarCustom() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleScroll = () => {
    if (window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  const { user } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {" "}
      <Navbar
        className={`fixed top-0 z-50 mx-auto w-full max-w-full px-6 py-2 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent border-none shadow-none"
        }`}
        fullWidth
      >
        <div className={`flex items-center justify-between ${
          isScrolled ? "text-gray-900" : "text-white"
        }`}>
          <Typography
            as="a"
            href="#"
            variant="h4"
            className="mr-4 cursor-pointer py-1.5 italic"
          >
            <Link to="/" className={`${isScrolled ? "text-blue-900" : "text-white"}  `}>
              <img src={Logo} className="h-8" alt="" />
            </Link>
          </Typography>
          <div className="hidden lg:block">
            <NavList user={user} handleLogout={handleLogout} isScrolled={isScrolled} />
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit  
hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon
                className={`h-6 w-6 ${isScrolled ? "text-light-blue-500" : "text-white"}`}
                strokeWidth={2}
              />
            ) : (
              <Bars3Icon
                className={`h-6 w-6 ${isScrolled ? "text-light-blue-500" : "text-white"}`}
                strokeWidth={2}
              />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList user={user} handleLogout={handleLogout} isScrolled={isScrolled} />
        </Collapse>
      </Navbar>
      <div className="h-16"></div>
    </>
  );
}
