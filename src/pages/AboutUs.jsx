import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
  IconButton,
  Chip,
  CardHeader,
  Tooltip,
  CardFooter,
} from "@material-tailwind/react";
import {
  CalendarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarDaysIcon,
  StarIcon,
  XCircleIcon,
  ClockIcon,
  MapPinIcon,
  HeartIcon,
  MusicalNoteIcon,
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

import Layout from "../components/common/Layout";

export default function AboutUs() {
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      name: "Tech Conference 2024",
      date: new Date("2024-03-15"),
      time: "09:00 AM",
      location: "San Francisco, CA",
      thumbnail: "https://example.com/tech-conf-2024.jpg",
      category: "Technology",
      tags: ["AI", "Blockchain", "IoT"],
    },
    {
      id: 2,
      name: "Summer Music Festival",
      date: new Date("2024-07-20"),
      time: "02:00 PM",
      location: "Central Park, NY",
      thumbnail: "https://example.com/summer-music-fest.jpg",
      category: "Music",
      tags: ["Rock", "Pop", "Jazz"],
    },
    {
      id: 3,
      name: "Global Business Summit",
      date: new Date("2024-05-10"),
      time: "10:00 AM",
      location: "London, UK",
      thumbnail: "https://example.com/business-summit.jpg",
      category: "Business",
      tags: ["Finance", "Leadership", "Innovation"],
    },
  ]);

  return (
    <Layout>
      <div className="bg-white">
        {/* Introduction */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkZGRkYiIGZpbGwtb3BhY2l0eT0iLjEiPjxwYXRoIGQ9Ik0zNiAzNGgLTJWMzJIMzZ6TTQwIDMwSDM4djJINDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10" />
          <div className="relative max-w-4xl mx-auto text-center">
            <Typography variant="h1" color="white" className="mb-4">
              Welcome to Event Hive
            </Typography>
            <Typography variant="lead" color="white" className="opacity-80">
              Revolutionizing event management and simplifying the RSVP process
              for attendees and organizers alike.
            </Typography>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <Typography variant="h2" color="blue-gray">
                Upcoming Events
              </Typography>
              <Button
                variant="outlined"
                color="blue"
                className="flex items-center gap-2"
              >
                See All Events
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        {/* Our Mission */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" color="blue-gray" className="mb-4">
              Our Mission
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className="font-normal"
            >
              At Event Hive, we're on a mission to make event planning and
              attendance seamless and enjoyable. We aim to empower organizers
              with powerful tools and provide attendees with a hassle-free RSVP
              experience.
            </Typography>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <Typography
              variant="h2"
              color="blue-gray"
              className="mb-12 text-center"
            >
              Key Features
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FeatureCard
                icon={<CalendarIcon className="h-8 w-8 text-blue-500" />}
                title="Easy Event Creation"
                description="Create and manage events with just a few clicks."
              />
              <FeatureCard
                icon={<UserGroupIcon className="h-8 w-8 text-blue-500" />}
                title="Attendee Management"
                description="Effortlessly manage your guest list and RSVPs."
              />
              <FeatureCard
                icon={<CheckCircleIcon className="h-8 w-8 text-blue-500" />}
                title="Quick RSVP"
                description="Attendees can easily accept or decline invitations."
              />
              <FeatureCard
                icon={<ChartBarIcon className="h-8 w-8 text-blue-500" />}
                title="Real-time Analytics"
                description="Get insights on attendance and engagement."
              />
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Typography variant="h2" color="blue-gray" className="mb-8">
              Our Team
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className="mb-12 font-normal"
            >
              Event Hive is powered by a passionate team of event management
              experts and tech enthusiasts. With our combined experience of over
              30 years in the industry, we're committed to revolutionizing how
              events are planned and attended.
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <TeamMember
                name="Jane Doe"
                role="CEO & Founder"
                image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
              <TeamMember
                name="John Smith"
                role="CTO"
                image="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
              <TeamMember
                name="Alice Johnson"
                role="Head of Design"
                image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              />
            </div>
          </div>
        </section>

        {/* User Testimonials */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-cyan-500">
          <div className="max-w-5xl mx-auto">
            <Typography
              variant="h2"
              color="white"
              className="mb-12 text-center"
            >
              What Our Users Say
            </Typography>
            <TestimonialSlider />
          </div>
        </section>

        {/* Future Goals */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" color="blue-gray" className="mb-8">
              Looking Ahead
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className="mb-8 font-normal"
            >
              We're constantly working to improve Event Hive. Our roadmap
              includes advanced analytics, integration with popular calendar
              apps, and a mobile app for on-the-go event management.
            </Typography>
            <Typography
              variant="paragraph"
              color="gray"
              className="font-normal"
            >
              Your feedback drives our innovation. Join our community and help
              shape the future of event management!
            </Typography>
          </div>
        </section>

        {/* Calendar */}

        {/* Call to Action */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" color="blue-gray" className="mb-8">
              Ready to Revolutionize Your Events?
            </Typography>
            <Button
              variant="gradient"
              color="blue"
              size="lg"
              className="flex items-center gap-3 mx-auto"
            >
              Get Started
              <ArrowRightIcon strokeWidth={2} className="h-5 w-5" />
            </Button>
            <div className="mt-8 flex justify-center space-x-6">
              <SocialLink href="#" icon={<FacebookIcon />} />
              <SocialLink href="#" icon={<TwitterIcon />} />
              <SocialLink href="#" icon={<InstagramIcon />} />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export function EventCard({ event }) {
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray" className="relative h-56">
        <img
          src={event.thumbnail}
          alt={event.name}
          className="h-full w-full object-cover"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <HeartIcon className="h-6 w-6" />
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {event.name}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            5.0
          </Typography>
        </div>
        <Typography color="gray" className="mb-4 font-normal">
          {event.description ||
            "Join us for an unforgettable event experience!"}
        </Typography>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
          <Tooltip content={format(event.date, "MMMM d, yyyy")}>
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <CalendarDaysIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          <Tooltip content={event.time}>
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <ClockIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          <Tooltip content={event.location}>
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <MapPinIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          <Tooltip content="Expected attendees">
            <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
              <UserGroupIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          {event.category === "Music" && (
            <Tooltip content="Live music">
              <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                <MusicalNoteIcon className="h-5 w-5" />
              </span>
            </Tooltip>
          )}
        </div>
      </CardBody>
      <CardFooter className="pt-3">
        <div className="flex flex-wrap gap-2">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-blue-500 px-3 py-1 text-sm font-semibold text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="mt-6">
      <CardBody>
        <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-100">
          {icon}
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography color="gray" className="font-normal">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}

function TeamMember({ name, role, image }) {
  return (
    <Card className="overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-56 object-cover object-center"
      />
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-1">
          {name}
        </Typography>
        <Typography color="gray" className="font-normal">
          {role}
        </Typography>
      </CardBody>
    </Card>
  );
}

function TestimonialSlider() {
  const testimonials = [
    {
      quote:
        "Event Hive has transformed how we manage our corporate events. It's a game-changer!",
      author: "Sarah L.",
      role: "Event Coordinator",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "As an attendee, I love how easy it is to RSVP and keep track of my upcoming events.",
      author: "Mike T.",
      role: "Regular Event-goer",
      image:
        "https://media.istockphoto.com/id/1528491760/photo/young-businesswoman-posing-by-window.jpg?s=1024x1024&w=is&k=20&c=oqSUDful8bPaXVLt8yRfoWvp7-YDW7vDAINNGnF9vz8=",
    },
    {
      quote:
        "The analytics feature has helped us optimize our event planning process significantly.",
      author: "Emily R.",
      role: "Marketing Manager",
      image:
        "https://images.unsplash.com/photo-1527613426441-4da17471b66d?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Testimonial {...testimonial} />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between">
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={prevSlide}
          className="bg-white/30 hover:bg-white/50 rounded-full"
        >
          <ChevronLeftIcon strokeWidth={3} className="w-6 h-6" />
        </IconButton>
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={nextSlide}
          className="bg-white/30 hover:bg-white/50 rounded-full"
        >
          <ChevronRightIcon strokeWidth={3} className="w-6 h-6" />
        </IconButton>
      </div>
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {testimonials.map((_, index) => (
            <Button
              key={index}
              size="sm"
              color={index === currentIndex ? "white" : "blue-gray"}
              variant={index === currentIndex ? "filled" : "text"}
              className="rounded-full p-1 min-w-0"
              onClick={() => setCurrentIndex(index)}
            >
              <span className="sr-only">{`Go to slide ${index + 1}`}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Testimonial({ quote, author, role, image }) {
  return (
    <Card className="bg-white/10 backdrop-blur-sm h-full">
      <CardBody className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={image}
              alt={author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <Typography variant="h6" color="white">
                {author}
              </Typography>
              <Typography color="white" className="font-normal opacity-80">
                {role}
              </Typography>
            </div>
          </div>
          <Typography color="white" className="font-normal italic">
            "{quote}"
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
}

function SocialLink({ href, icon }) {
  return (
    <IconButton variant="text" color="blue-gray" href={href}>
      {icon}
    </IconButton>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996  4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}
