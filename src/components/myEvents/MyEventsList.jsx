import React from "react";
import MyEventDetails from "./MyEventDetails";

export default function MyEventsList({ events }) {
  return (
    <>
      {events?.map((event) => (
        <MyEventDetails event={event} />
      ))}
    </>
  );
}
