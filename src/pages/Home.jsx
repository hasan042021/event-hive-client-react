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

export default function Home() {
  const [selectedslug, setSelectedSlug] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [now, setNow] = useState(false);
  const [filter, setFilter] = useState({});

  const reset = () => {
    setTag(null);
    setSelectedSlug(null);
    setSelectedCategory(null);
  };

  const { data: events, isLoading, isSuccess } = useGetEventsQuery();
  const { data: filteredEvents, isSuccess: isFilterSuccess } =
    useFilterEventsQuery(filter, { skip: !now });
  useEffect(() => {
    console.log(filteredEvents);
  }, [filteredEvents]);
  function handleSubmit(e) {
    e.preventDefault();
    console.log(tag, selectedslug);
    let filter = {};
    if (selectedslug == null && tag == null) {
      filter = {};
    } else if (selectedslug && tag == null) {
      filter = { category: selectedslug };
    } else if (tag && selectedslug == null) {
      filter = { tag: tag };
    } else {
      filter = { category: selectedslug, tag: tag };
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
            handleSubmit={handleSubmit}
            reset={reset}
          />
        </div>
        <div className="col-span-6 ">
          {isFilterSuccess ? (
            <Events events={filteredEvents} />
          ) : (
            <Events events={events} />
          )}
        </div>
      </div>
    </Layout>
  );
}
