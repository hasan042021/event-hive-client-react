import React, { useState, useEffect, useCallback } from "react";
import {
  Calendar,
  Users,
  CheckCircle,
  BarChart3,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Heart,
  Music,
  Star,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

import NavbarCustom from "../components/common/Navbar";

export default function AboutUs() {
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      name: "Tech Conference 2024",
      date: new Date("2024-03-15"),
      time: "09:00 AM",
      location: "San Francisco, CA",
      thumbnail:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
      category: "Technology",
      tags: ["AI", "Blockchain", "IoT"],
    },
    {
      id: 2,
      name: "Summer Music Festival",
      date: new Date("2024-07-20"),
      time: "02:00 PM",
      location: "Central Park, NY",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      category: "Music",
      tags: ["Rock", "Pop", "Jazz"],
    },
    {
      id: 3,
      name: "Global Business Summit",
      date: new Date("2024-05-10"),
      time: "10:00 AM",
      location: "London, UK",
      thumbnail:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop",
      category: "Business",
      tags: ["Finance", "Leadership", "Innovation"],
    },
  ]);

  return (
    <div
      className="h-screen overflow-y-scroll snap-y snap-mandatory font-['Inter',sans-serif]"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style jsx>{`
        .h-screen::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Navbar Section */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <NavbarCustom />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white h-screen snap-start flex items-center justify-center pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div
                className={`w-2 h-2 ${
                  Math.random() > 0.5 ? "bg-blue-500" : "bg-cyan-500"
                } rounded-full`}
              ></div>
            </div>
          ))}
        </div>

        {/* Floating Shapes */}
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-cyan-500/5 rounded-full animate-bounce"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to <span className="text-blue-600">Event Hive</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700/90 max-w-3xl mx-auto font-light">
            Revolutionizing event management and simplifying the RSVP process
            for attendees and organizers alike
          </p>
          <div className="mt-12 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-400 rounded-full mx-auto">
              <div className="w-1 h-3 bg-gray-400 rounded-full mx-auto mt-2 animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-medium tracking-wider uppercase">
              Scroll Down
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="h-screen snap-start flex items-center justify-center bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Our Mission
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-700 leading-relaxed">
            At <span className="font-semibold text-blue-600">Event Hive</span>,
            we're on a mission to make event planning and attendance seamless
            and enjoyable. We empower organizers with powerful tools and provide
            attendees with a hassle-free RSVP experience.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="h-screen snap-start flex items-center justify-center bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Key Features
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Calendar className="w-8 h-8 text-blue-500" />}
              title="Easy Event Creation"
              description="Create and manage events with just a few clicks using our intuitive interface."
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-purple-500" />}
              title="Attendee Management"
              description="Effortlessly manage your guest list and track RSVPs in real-time."
            />
            <FeatureCard
              icon={<CheckCircle className="w-8 h-8 text-green-500" />}
              title="Quick RSVP"
              description="Attendees can easily accept or decline invitations with one click."
            />
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-cyan-500" />}
              title="Real-time Analytics"
              description="Get detailed insights on attendance patterns and engagement metrics."
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="h-screen snap-start flex items-center justify-center bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Our Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
              Event Hive is powered by a passionate team of event management
              experts and tech enthusiasts. With our combined experience of over
              30 years in the industry, we're committed to revolutionizing how
              events are planned and attended.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <TeamMember
              name="Jane Doe"
              role="CEO & Founder"
              image="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop"
            />
            <TeamMember
              name="John Smith"
              role="CTO"
              image="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop"
            />
            <TeamMember
              name="Alice Johnson"
              role="Head of Design"
              image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="h-screen snap-start flex items-center justify-center bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              What Our Users Say
            </h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen snap-start flex items-center justify-center bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Ready to Revolutionize Your Events?
          </h2>
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-6 mt-12">
            <SocialLink href="#" icon={<Facebook className="w-6 h-6" />} />
            <SocialLink href="#" icon={<Twitter className="w-6 h-6" />} />
            <SocialLink href="#" icon={<Instagram className="w-6 h-6" />} />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function TeamMember({ name, role, image }) {
  return (
    <div className="group text-center">
      <div className="relative mb-6 inline-block">
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
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
        "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=80&h=80&fit=crop",
    },
    {
      quote:
        "As an attendee, I love how easy it is to RSVP and keep track of my upcoming events.",
      author: "Mike T.",
      role: "Regular Event-goer",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop",
    },
    {
      quote:
        "The analytics feature has helped us optimize our event planning process significantly.",
      author: "Emily R.",
      role: "Marketing Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
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
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
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

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
      >
        <ChevronRight className="w-6 h-6 text-gray-900" />
      </button>

      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-gray-900 scale-125"
                : "bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Testimonial({ quote, author, role, image }) {
  return (
    <div className="bg-white rounded-2xl p-8 h-full">
      <div className="flex items-start gap-6 mb-6">
        <img
          src={image}
          alt={author}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <h4 className="text-xl font-semibold text-gray-900 mb-1">{author}</h4>
          <p className="text-gray-700/80">{role}</p>
        </div>
      </div>
      <blockquote className="text-gray-800/90 text-lg italic leading-relaxed">
        "{quote}"
      </blockquote>
    </div>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-500 hover:text-white transition-colors duration-200"
    >
      {icon}
    </a>
  );
}
