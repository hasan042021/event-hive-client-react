import { Card, Typography, Button, Chip } from "@material-tailwind/react";
import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetTagsQuery,
} from "../../features/events/eventsApi";
import Info from "./Info";
import SidebarSkeleton from "../skeletons/SidebarSkeleton";

export function SidebarHome({
  selectedCategory,
  setSelectedCategory,
  selectedslug,
  setSelectedSlug,
  selectedTags,
  setSelectedTags,
  handleSubmit,
  reset,
}) {
  const [isExpanded, setIsExpanded] = useState(false); // For "See All"

  const { data: cats, isLoading: categoryLoading } = useGetCategoriesQuery();
  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();

  function handleCatChange(e, name, slug) {
    setSelectedCategory(name);
    setSelectedSlug(slug);
  }

  function handleTagChange(id) {
    const newSelectedTags = [...selectedTags];
    if (newSelectedTags.includes(id)) {
      setSelectedTags(newSelectedTags.filter((item) => item !== id));
    } else {
      setSelectedTags([...newSelectedTags, id]);
    }
  }

  const handleToggleExpand = () => setIsExpanded(!isExpanded); // Toggle between showing more or less categories

  // By default show up to 5 categories
  const visibleCategories = isExpanded ? cats : cats?.slice(0, 5);

  return (
    <div className="p-4 border-0 my-2 relative z-20 flex flex-col h-full">
      <div className="mb-2 h-10">
        <Info />
      </div>

      {tagsLoading || categoryLoading ? (
        <SidebarSkeleton />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col h-full rounded">
          <div
            className="border-2 p-2 rounded overflow-y-scroll [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:bg-gray-200
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full"
            style={{
              boxShadow: "inset 0 -10px 10px -10px rgba(23, 20, 20, 0.5)",
            }}
          >
            {/* Categories */}
            <Typography className="text-start p-2 pb-1" variant="h6">
              Categories
            </Typography>
            <hr className="pb-1" />
            <div className="flex flex-col gap-2 cursor-pointer overflow-y-auto ">
              {visibleCategories?.map((c, idx) => (
                <Typography
                  key={idx}
                  variant="small"
                  onClick={(e) => handleCatChange(e, c.name, c.slug)}
                  className={`rounded-full  border font-medium transition-all duration-300  ${
                    selectedCategory === c.name
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  {c.name}
                </Typography>
              ))}
            </div>

            {/* "See All" or "See Less" button */}
            {cats?.length > 5 && (
              <div className="flex justify-center">
                <Chip
                  size="sm"
                  color="blue"
                  onClick={handleToggleExpand}
                  className="mt-2 cursor-pointer p-1"
                  value={isExpanded ? "See Less" : "See All"}
                ></Chip>
              </div>
            )}

            {/* Tags */}
            <Typography className="text-start pb-1" variant="h6">
              Tags
            </Typography>
            <hr className="pb-1" />
            <div className=" flex gap-2  flex-wrap overflow-y-auto ">
              {tags?.map((t, idx) => (
                <Chip
                  key={idx}
                  value={t.name}
                  onClick={() => handleTagChange(t.id)}
                  size="sm"
                  className={`cursor-pointer  ${
                    selectedTags?.includes(t.id)
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  } px-1 py-0 border rounded`}
                  variant={selectedTags?.includes(t.id) ? "filled" : "outlined"}
                  color={selectedTags?.includes(t.id) ? "blue" : "gray"}
                >
                  <small>{t.name}</small>
                </Chip>
              ))}
            </div>
          </div>
          {/* Buttons */}
          <div className="h-20 my-2">
            <div className="mt-auto flex  gap-2 justify-center">
              <Button
                color="cyan"
                type="button"
                onClick={reset}
                className="p-1 px-4 rounded-full"
              >
                Reset
              </Button>
              <Button
                color="blue"
                type="submit"
                className="p-1 px-4 rounded-full"
              >
                Filter
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
