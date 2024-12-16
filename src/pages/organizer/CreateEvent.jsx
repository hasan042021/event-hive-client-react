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
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function CreateEvent() {
  const [now, setNow] = useState(false);
  const { data: allTags } = useGetTagsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [
    createEvent,
    { isSuccess: eventCreated, isError: eventCreationError },
  ] = useCreateEventMutation();
  const { user } = useSelector((state) => state.auth);
  const { data: organizerInfo, isSuccess } = useGetProfileQuery(user.id, {
    skip: !now,
  });

  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [thumbnail, setThumbnail] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]);
  const [isPublic, setIsPublic] = useState();
  const resetForm = () => {
    setName("");
    setDate("");
    setTime("");
    setLocation("");
    setThumbnail("");
    setDescription("");
    setCategory("");
    setTags([]); // Resetting tags to an empty array
    setIsPublic(false); // Assuming default is `false`
  };

  useEffect(() => {
    if (isSuccess) setNow(true);
  }, [isSuccess]);
  useEffect(() => {
    if (eventCreated) {
      toast.success("Event Created Successfully.");
      resetForm();
    }
  }, [eventCreated]);
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
      <div className="flex my-3 w-full justify-center">
        <Card className="max-w-4xl">
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Typography variant="h4" color="blue-gray" className="mb-6">
                Create New Event
              </Typography>

              <div className="space-y-4">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  label="Event Name"
                  placeholder="Enter event name"
                  className="w-full"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    variant="outlined"
                    label="Date"
                    type="date"
                    placeholder="Select date"
                  />
                  <Input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    variant="outlined"
                    label="Time"
                    type="time"
                    placeholder="Select time"
                  />
                </div>

                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  variant="outlined"
                  label="Location"
                  placeholder="Enter location"
                />

                <div className="relative">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Thumbnail
                  </Typography>
                  <Input
                    variant="outlined"
                    label="Thumbnail"
                    placeholder="Choose file"
                    onChange={(e) => setThumbnail(e.target.files[0])}
                    type="file"
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="flex items-center justify-center w-full px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Choose Thumbnail
                  </label>
                </div>

                <Textarea
                  variant="outlined"
                  label="Description"
                  placeholder="Enter event description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />

                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Category
                  </Typography>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-2 font-medium"
                  >
                    Tags
                  </Typography>
                  <select
                    multiple
                    value={tags}
                    onChange={handleTagChange}
                    className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  >
                    {allTags?.map((tag) => (
                      <option key={tag.id} value={tag.id}>
                        {tag.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center">
                  <Checkbox
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    color="blue"
                    className="h-5 w-5"
                  />
                  <Typography color="gray" className="ml-2 font-medium">
                    Make this event public
                  </Typography>
                </div>
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-blue-500 hover:bg-blue-700 transition-colors duration-300"
            >
              Create Event
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
}
