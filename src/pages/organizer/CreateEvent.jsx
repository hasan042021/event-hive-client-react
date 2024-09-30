import {
  useCreateEventMutation,
  useGetCategoriesQuery,
  useGetTagsQuery,
} from "../../features/events/eventsApi";
import Layout from "../../components/common/Layout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "../../features/profile/profileApi";
import {
  Checkbox,
  Textarea,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";

export default function CreateEvent() {
  const [now, setNow] = useState(false);
  const { data: allTags } = useGetTagsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [createEvent] = useCreateEventMutation();
  const { user } = useSelector((state) => state.auth);
  const { data: organizerInfo, isSuccess } = useGetProfileQuery(user.id, {
    skip: !now,
  });

  useEffect(() => {
    if (isSuccess) setNow(true);
  }, [isSuccess]);
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState();

  const handleTagChange = (event) => {
    const selectedOptions = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => Number(option.value));
    setTags(selectedOptions);
    console.log(typeof selectedOptions);
    console.log(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("location", location);
    formData.append("thumbnail", thumbnail);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("is_public", isPublic);
    formData.append("organizer", user.id);

    createEvent(formData);
  };

  return (
    <Layout>
      <div className="flex my-3 text-start flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-3 shadow m-2 space-y-4 "
        >
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            label="Event Name"
            placeholder="Event Name"
          />

          <Input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            variant="outlined"
            label="Date"
            type="date"
            placeholder="Date"
          />
          <Input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            variant="outlined"
            label="Time"
            placeholder="Time"
            type="time"
          />
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            variant="outlined"
            label="Location"
            placeholder="Location"
          />
          <Input
            variant="outlined"
            label="Thumbnail"
            placeholder="Thubmnail"
            onChange={(e) => setThumbnail(e.target.files[0])}
            type="file"
          />
          <Textarea
            variant="outlined"
            label="Description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex flex-col">
            <label htmlFor="category" className="text-gray-700 font-bold">
              <Typography variant="h6">Category</Typography>
            </label>
            <select
              htmlFor="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border font-sans rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              {categories?.map((cat) => {
                return (
                  <option className="font-sans" key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Tags Input (assuming a multiple-select or tag input) */}
          <div className="flex flex-col">
            <label htmlFor="tags" className="text-gray-700  font-bold">
              <Typography variant="h6"> Tags</Typography>
            </label>
            <select
              id="tags"
              className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 border rounded bg-gray-50 overflow-y-scroll [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-200
  [&::-webkit-scrollbar-thumb]:bg-blue-600
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full"
              multiple
              value={tags}
              onChange={handleTagChange}
            >
              {allTags?.map((tag) => (
                <option key={tag.id} value={tag.id} className="font-sans">
                  {tag.name}
                </option>
              ))}
            </select>
          </div>

          {/* Is Public Checkbox */}

          <div>
            <Checkbox
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              label={<Typography variant="h6">Is Public</Typography>}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Create Event
          </Button>
        </form>
      </div>
    </Layout>
  );
}
