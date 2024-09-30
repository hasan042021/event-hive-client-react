import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, PowerIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApi";

function NavList({ user, handleLogout }) {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
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
              className="text-white hover:text-white flex items-center "
            >
              <Link className="text-white-300 hover:text-white" to="/login">
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
              className="text-white flex items-center "
            >
              <a href="">
                <Link className="text-blue-300" to="/register">
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
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link
              to={`/attendee/myevents/`}
              className="flex items-center text-white hover:text-white"
            >
              My Events
            </Link>
          </Typography>

          <Typography
            as="li"
            variant="small"
            color="white"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
                fill="#f7f7f7"
              />
            </svg>
            <Link
              to={`/${user.role}/profile/`}
              className="flex items-center text-white hover:text-white"
            >
              Account
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
              className="text-blue-300 flex items-center "
              onClick={handleLogout}
            >
              <PowerIcon className="h-5 w-5 " />
              <span className="ml-2">Logout</span>
            </Button>
          </Typography>
        </>
      ) : (
        <>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link
              to={`/organizer/create-event/`}
              className="flex items-center text-white hover:text-white"
            >
              Create Event
            </Link>
          </Typography>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium"
          >
            <Link
              to={`/organizer/created-events/`}
              className="flex items-center text-white hover:text-white"
            >
              Created Events
            </Link>
          </Typography>

          <Typography
            as="li"
            variant="small"
            color="white"
            className="flex items-center gap-x-2 p-1 font-medium"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16 8.5C16 10.6217 15.1571 12.6566 13.6569 14.1569C12.1566 15.6571 10.1217 16.5 8 16.5C5.87827 16.5 3.84344 15.6571 2.34315 14.1569C0.842855 12.6566 0 10.6217 0 8.5C0 6.37827 0.842855 4.34344 2.34315 2.84315C3.84344 1.34285 5.87827 0.5 8 0.5C10.1217 0.5 12.1566 1.34285 13.6569 2.84315C15.1571 4.34344 16 6.37827 16 8.5ZM10 5.5C10 6.03043 9.78929 6.53914 9.41421 6.91421C9.03914 7.28929 8.53043 7.5 8 7.5C7.46957 7.5 6.96086 7.28929 6.58579 6.91421C6.21071 6.53914 6 6.03043 6 5.5C6 4.96957 6.21071 4.46086 6.58579 4.08579C6.96086 3.71071 7.46957 3.5 8 3.5C8.53043 3.5 9.03914 3.71071 9.41421 4.08579C9.78929 4.46086 10 4.96957 10 5.5ZM8 9.5C7.0426 9.49981 6.10528 9.77449 5.29942 10.2914C4.49356 10.8083 3.85304 11.5457 3.454 12.416C4.01668 13.0706 4.71427 13.5958 5.49894 13.9555C6.28362 14.3152 7.13681 14.5009 8 14.5C8.86319 14.5009 9.71638 14.3152 10.5011 13.9555C11.2857 13.5958 11.9833 13.0706 12.546 12.416C12.147 11.5457 11.5064 10.8083 10.7006 10.2914C9.89472 9.77449 8.9574 9.49981 8 9.5Z"
                fill="#f7f7f7"
              />
            </svg>
            <Link
              to={`/${user.role}/profile/`}
              className="flex items-center text-white hover:text-white"
            >
              Account
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
              className="text-blue-300 flex items-center "
              onClick={handleLogout}
            >
              <PowerIcon className="h-5 w-5 " />
              <span className="ml-2">Logout</span>
            </Button>
          </Typography>
        </>
      )}
    </ul>
  );
}

export default function NavbarCustom() {
  const [openNav, setOpenNav] = React.useState(false);

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
    <Navbar
      variant="gradient"
      colorScheme="teal"
      color="light-blue"
      // Choose a suitable color scheme
      className="mx-auto w-full max-w-full px-6  py-3"
      fullWidth
    >
      <div className="flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          variant="h4"
          className="mr-4 cursor-pointer py-1.5"
        >
          <Link to="/" className="text-white  hover:text-white">
            Event Hive
          </Link>
        </Typography>
        <div className="hidden lg:block">
          <NavList user={user} handleLogout={handleLogout} />
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
              className="h-6 
 w-6"
              strokeWidth={2}
            />
          ) : (
            <Bars3Icon
              className="h-6 w-6 text-light-blue-500"
              strokeWidth={2}
            />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList user={user} handleLogout={handleLogout} />
      </Collapse>
    </Navbar>
  );
}
