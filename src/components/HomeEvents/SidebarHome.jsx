import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Radio,
  Button,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetTagsQuery,
} from "../../features/events/eventsApi";

export function SidebarHome({
  selectedCategory,
  setSelectedCategory,
  tag,
  setTag,
  selectedslug,
  setSelectedSlug,
  handleSubmit,
  reset,
}) {
  function handleCatChange(e, name, slug) {
    setSelectedCategory(name);
    setSelectedSlug(slug);
  }
  const { data: cats } = useGetCategoriesQuery();
  const { data: tags } = useGetTagsQuery();
  return (
    <Card
      variant="gradient"
      color="white"
      className="h-[100vh] p-4 border-pink-500 shadow-xl my-2"
    >
      <form onSubmit={handleSubmit}>
        <Typography variant="h6">Categories</Typography>

        <div
          className="h-1/5 my-3 border rounded bg-gray-50 overflow-y-scroll [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-200
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <ul className="space-y-2 p-2  ">
            {cats?.map((c, idx) => (
              <li key={idx}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={c.name}
                    checked={selectedCategory === c.name}
                    onChange={(e) => handleCatChange(e, c.name, c.slug)}
                    className="mr-2 border-gray-300 rounded-full focus:ring-indigo-500 h-6 w-6" // Increase size and rounded border
                  />
                  <span className="text-gray-700">{c.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <Typography variant="h6">Tags</Typography>
        <div
          className=" h-1/5 my-3 border rounded bg-gray-50 overflow-y-scroll [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-200
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          <ul className="space-y-2 p-2  ">
            {tags?.map((t, idx) => (
              <li key={idx}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="tag"
                    value={t.name}
                    checked={tag === t.id}
                    onChange={() => setTag(t.id)}
                    className="mr-2 border-gray-300 rounded-full focus:ring-indigo-500 h-6 w-6" // Increase size and rounded border
                  />
                  <span className="text-gray-700">{t.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
        <Button type="submit" onClick={reset} className="mx-2">
          Reset
        </Button>
        <Button type="submit">Filter</Button>
      </form>
    </Card>
  );
}
