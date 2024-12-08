import React, { useState } from "react";
import {
  CalendarDaysIcon,
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
  UserGroupIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  parse,
  isBefore,
} from "date-fns";
import {
  Typography,
  Button,
  Chip,
  Card,
  CardBody,
} from "@material-tailwind/react";
import Layout from "../components/common/Layout";

export default function AboutUs() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const dummyEvents = [
    { date: new Date(2024, 10, 20), title: "Tech Conference 2023" },
    { date: new Date(2024, 10, 22), title: "Summer Music Festival" },
    { date: new Date(2024, 9, 24), title: "Startup Pitch Night" },
    { date: new Date(2024, 10, 27), title: "Art Gallery Opening" },
    { date: new Date(2024, 11, 29), title: "Charity Gala Dinner" },
    { date: new Date(2024, 11, 10), title: "International Food Fair" },
  ];

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <Button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 0))}
          disabled={isBefore(startOfMonth(currentMonth), today)}
          className="p-2"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
        <Typography variant="h4" className="text-center">
          {format(currentMonth, "MMMM yyyy")}
        </Typography>
        <Button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-semibold">
          {format(addDays(startDate, i), dateFormat).substring(0, 3)}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isDisabled = isBefore(cloneDay, today);

        days.push(
          <div
            key={cloneDay}
            className={`p-2 rounded text-center ${
              isDisabled
                ? "text-gray-400 cursor-not-allowed"
                : isSameMonth(day, monthStart)
                ? "cursor-pointer hover:bg-blue-200"
                : "text-gray-300"
            } ${
              isSameDay(day, selectedDate)
                ? "bg-cyan-500 rounded text-white"
                : ""
            }`}
            onClick={() => !isDisabled && setSelectedDate(cloneDay)}
          >
            <span>{format(day, "d")}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };
  return (
    <Layout>
      <div className="min-h-screen bg-white text-black p-8">
        <div className="max-w-6xl mx-auto">
          <Typography
            variant="h1"
            className="text-center mb-8 text-5xl font-bold text-black"
          >
            Welcome to Event Hive
          </Typography>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardBody>
                <Typography variant="h3" color="blue" className="mb-4">
                  For Organizers
                </Typography>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CalendarDaysIcon className="mr-2 h-6 w-6 text-blue-500 flex-shrink-0" />
                    <Typography>Create and manage events with ease</Typography>
                  </li>
                  <li className="flex items-start">
                    <UserGroupIcon className="mr-2 h-6 w-6 text-blue-500 flex-shrink-0" />
                    <Typography>Real-time attendee tracking</Typography>
                  </li>
                  <li className="flex items-start">
                    <CheckCircleIcon className="mr-2 h-6 w-6 text-blue-500 flex-shrink-0" />
                    <Typography>
                      Automated reminders and communication
                    </Typography>
                  </li>
                  <li className="flex items-start">
                    <StarIcon className="mr-2 h-6 w-6 text-blue-500 flex-shrink-0" />
                    <Typography>Custom branding for event pages</Typography>
                  </li>
                </ul>
              </CardBody>
            </Card>
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardBody>
                <Typography variant="h3" color="cyan" className="mb-4">
                  For Attendees
                </Typography>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircleIcon className="mr-2 h-6 w-6 text-cyan-500 flex-shrink-0" />
                    <Typography>One-click RSVP for events</Typography>
                  </li>
                  <li className="flex items-start">
                    <XCircleIcon className="mr-2 h-6 w-6 text-cyan-500 flex-shrink-0" />
                    <Typography>Easy cancellations and rescheduling</Typography>
                  </li>
                  <li className="flex items-start">
                    <CalendarDaysIcon className="mr-2 h-6 w-6 text-cyan-500 flex-shrink-0" />
                    <Typography>Personalized event recommendations</Typography>
                  </li>
                  <li className="flex items-start">
                    <StarIcon className="mr-2 h-6 w-6 text-cyan-500 flex-shrink-0" />
                    <Typography>Virtual event previews and tours</Typography>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </div>

          {/* Calendar Section */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg shadow-blue-500/20 mb-16">
            <CardBody>
              <Typography
                variant="h3"
                className="mb-4 text-center text-cyan-300"
              >
                Upcoming Events
              </Typography>

              {renderHeader()}
              {renderDays()}
              {renderCells()}

              <div className="space-y-2 mt-4">
                {dummyEvents
                  .filter((event) => isSameDay(event.date, selectedDate))
                  .map((event, index) => (
                    <Chip
                      key={index}
                      value={event.title}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                    />
                  ))}
              </div>
            </CardBody>
          </Card>

          {/* Mission Section */}
          <div className="text-center mb-16">
            <Typography variant="h3" className="mb-4 text-cyan-500">
              Our Mission
            </Typography>
            <Typography
              variant="lead"
              className="max-w-2xl mx-auto text-gray-600"
            >
              At Event Hive, we're revolutionizing event management and RSVP
              experiences. Our AI-powered platform brings people together,
              creating unforgettable moments and fostering connections in both
              virtual and physical spaces.
            </Typography>
          </div>

          {/* Call-to-Action Section */}
          <div className="text-center">
            <Button size="lg" color="cyan">
              Join Event Hive Today
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
