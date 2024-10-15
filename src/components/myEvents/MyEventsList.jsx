import React from "react";
import MyEventDetails from "./MyEventDetails";
import notFoundImg from "../../assets/images/undraw_empty_re_opql.svg";
import { Typography } from "@material-tailwind/react";

export default function MyEventsList({ events }) {
  return (
    <>
      {events?.length == 0 ? (
        <div className="h-[100vh] flex-col flex items-center justify-center">
          <img src={notFoundImg} className="w-80" alt="" />
          <Typography variant="h6">
            You have not accepted any event yet.
          </Typography>
        </div>
      ) : (
        events?.map((event) => <MyEventDetails event={event} />)
      )}
    </>
  );
}
