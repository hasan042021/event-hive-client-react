import React, { useEffect, useState } from "react";

import UpdateProfile from "./attendee/UpdateProfile";
import Layout from "../components/common/Layout";
import Events from "../components/HomeEvents/Events";
import { SidebarHome } from "../components/HomeEvents/SidebarHome";
import { Button, Chip, Drawer } from "@material-tailwind/react";
import {
  useFilterEventsQuery,
  useGetCategoriesQuery,
  useGetEventsQuery,
  useGetTagsQuery,
} from "../features/events/eventsApi";
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton";
import EventsSkeleton from "../components/skeletons/EventsSkeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const [selectedslug, setSelectedSlug] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [now, setNow] = useState(false);
  const [filter, setFilter] = useState({});

  const reset = () => {
    setSelectedTags([]);
    setSelectedSlug(null);
    setSelectedCategory(null);
  };

  const {
    data: events,
    isLoading: eventsLoading,
    isSuccess,
  } = useGetEventsQuery();
  const {
    data: filteredEvents,
    isLoading: filteredLoading,
    isSuccess: isFilterSuccess,
  } = useFilterEventsQuery(filter, { skip: !now });
  useEffect(() => {
    console.log(filteredEvents, "line 33");
  }, [filteredEvents]);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(selectedTags, selectedslug);
    let filter = {};

    if (selectedslug == null && selectedTags?.length === 0) {
      filter = {};
    } else if (selectedslug && selectedTags?.length === 0) {
      filter = { category: selectedslug };
    } else if (selectedTags?.length > 0 && selectedslug == null) {
      filter = { tags: selectedTags }; // Pass array of selected tags
    } else {
      filter = { category: selectedslug, tags: selectedTags }; // Handle both category and tags
    }
    setFilter(filter);
    setNow(true);
    setOpen(false);
  }

  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <Layout>
      <div className="w-full container mx-auto">
        <div>
          <button
            className="z-50 fixed top-1/2 left-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-r-full shadow-md hover:bg-blue-600"
            onClick={openDrawer}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>

          <Drawer
            open={open}
            className="h-100"
            onClose={closeDrawer}
            size={window.innerWidth >= 768 ? 400 : window.innerWidth - 30}
          >
            {/* Close button */}
            <button
              className="z-50 absolute  top-1/2 right-0 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-l-full shadow-md hover:bg-blue-600"
              onClick={closeDrawer}
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <SidebarHome
              selectedslug={selectedslug}
              setSelectedSlug={setSelectedSlug}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              tag={tag}
              setTag={setTag}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
              handleSubmit={handleSubmit}
              reset={reset}
            />
          </Drawer>
        </div>

        <div className="col-span-1 p-2 mx-auto">
          {filteredLoading || eventsLoading ? (
            <EventsSkeleton /> // Display skeleton while events are loading
          ) : isFilterSuccess ? (
            <Events events={filteredEvents} />
          ) : (
            <Events events={events} />
          )}
        </div>
      </div>
    </Layout>
  );
}
