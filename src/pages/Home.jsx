import React, { useEffect, useState } from "react";

import UpdateProfile from "./attendee/UpdateProfile";
import Layout from "../components/common/Layout";
import Events from "../components/HomeEvents/Events";
import { SidebarHome } from "../components/HomeEvents/SidebarHome";
import { Chip } from "@material-tailwind/react";
import {
  useFilterEventsQuery,
  useGetCategoriesQuery,
  useGetEventsQuery,
  useGetTagsQuery,
} from "../features/events/eventsApi";
import SidebarSkeleton from "../components/skeletons/SidebarSkeleton";
import EventsSkeleton from "../components/skeletons/EventsSkeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4 w-full">
        <div className="col-span-3">
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
        </div>
        <div className="col-span-6">
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
