import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetAttendeeRSVPsQuery } from "../../features/RSVP/rsvpApi";
import Layout from "../../components/common/Layout";
import MyEventsList from "../../components/myEvents/MyEventsList";
import EventListSkeleton from "../../components/skeletons/EventListSkeleton";
import MyDateRangePicker from "../../components/myEvents/MyDateRangePicker";
import { isWithinDateRange } from "../../utils/date_time_format";

export default function MyEvents() {
  const user = useSelector((state) => state.auth.user);
  const { data: rsvps, isLoading } = useGetAttendeeRSVPsQuery(
    { id: user?.id },
    {
      skip: !user?.id,
    }
  );

  // State for the selected date range
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  // State for sorting order: default is "descending"
  const [sortOrder, setSortOrder] = useState("descending");

  // Update date range from the DateRangePicker component
  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
    console.log(startDate, endDate);
  };

  // Toggle the sorting order
  const toggleSortOrder = () => {
    setSortOrder((prevOrder) =>
      prevOrder === "ascending" ? "descending" : "ascending"
    );
  };

  // Filter events based on the selected date range
  const filteredEvents = rsvps?.filter((event) => {
    const eventDate = new Date(event.event.date);
    return isWithinDateRange(eventDate, dateRange.startDate, dateRange.endDate);
  });

  // Sort the filtered events based on the current sort order
  const sortedEvents = filteredEvents?.sort((a, b) => {
    const dateA = new Date(a.event.date);
    const dateB = new Date(b.event.date);
    return sortOrder === "ascending" ? dateA - dateB : dateB - dateA;
  });

  useEffect(() => {
    console.log(rsvps);
  }, [rsvps]);

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center gap-3">
          <MyDateRangePicker onDateRangeChange={handleDateRangeChange} />

          {/* Sort button to toggle sorting order */}
          <button
            onClick={toggleSortOrder}
            className="flex items-center  focus:outline-none  space-x-2 mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            {sortOrder === "ascending" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
            )}
            <span>Sort by Date</span>
          </button>
        </div>

        {isLoading ? (
          <EventListSkeleton />
        ) : (
          <MyEventsList events={sortedEvents} />
        )}
      </div>
    </Layout>
  );
}
