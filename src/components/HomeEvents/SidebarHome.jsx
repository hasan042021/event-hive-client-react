import { Card, Typography, Button, Chip } from "@material-tailwind/react";
import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetTagsQuery,
} from "../../features/events/eventsApi";
import Info from "./Info";

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

  const { data: cats } = useGetCategoriesQuery();
  const { data: tags } = useGetTagsQuery();

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
    <Card
      variant="gradient"
      color="white"
      className="p-4 border-pink-500 shadow-xl my-2"
    >
      <>
        <Info />
      </>
      <form onSubmit={handleSubmit}>
        {/* Categories */}
        <Typography className="text-start p-2" variant="h5">
          Categories
        </Typography>
        <div className="flex flex-col gap-2 cursor-pointer">
          {visibleCategories?.map((c, idx) => (
            <Typography
              key={idx}
              variant="p"
              onClick={(e) => handleCatChange(e, c.name, c.slug)}
              className={`rounded-full p-1 border font-medium transition-all duration-300 ${
                selectedCategory === c.name
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700  hover:bg-blue-500 hover:text-white"
              }`}
            >
              {c.name}
            </Typography>
          ))}
        </div>

        {/* "See All" or "See Less" button */}
        {cats?.length > 5 && (
          <Button
            size="sm"
            variant="text"
            color="blue"
            onClick={handleToggleExpand}
            className="mt-2"
          >
            {isExpanded ? "See Less" : "See All"}
          </Button>
        )}

        {/* Tags */}
        <Typography className="text-start p-2" variant="h5">
          Tags
        </Typography>
        <div className="my-3 border rounded bg-gray-50 flex gap-2 flex-wrap p-2">
          {tags?.map((t, idx) => (
            <Chip
              key={idx}
              value={t.name}
              onClick={() => handleTagChange(t.id)} // Handle click for selecting/deselecting tags
              className={`cursor-pointer ${
                selectedTags?.includes(t.id)
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-black"
              }`}
              variant={selectedTags?.includes(t.id) ? "filled" : "outlined"}
              color={selectedTags?.includes(t.id) ? "blue" : "gray"}
            >
              {t.name}
            </Chip>
          ))}
        </div>

        {/* Buttons */}
        <Button type="submit" onClick={reset} className="mx-2">
          Reset
        </Button>
        <Button type="submit">Filter</Button>
      </form>
    </Card>
  );
}
