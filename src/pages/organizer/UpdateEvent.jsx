import React, { useState, useEffect } from "react";
import {
  useGetCategoriesQuery,
  useGetEventQuery,
  useGetTagsQuery,
  useUpdateEventMutation,
} from "../../features/events/eventsApi";
import { useParams } from "react-router-dom";
import Layout from "../../components/common/Layout";
import save from "../../assets/images/save.png";
import {
  Button,
  Card,
  Checkbox,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import ImageUpload from "../../components/common/ImageUpload";
import { toast } from "react-toastify";

export default function UpdateEvent() {
  const [got, setGot] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const { eventId } = useParams();
  const { data: eventData } = useGetEventQuery(eventId, { skip: !got });
  const { data: allTags } = useGetTagsQuery();
  const { data: categories } = useGetCategoriesQuery();
  const [updateEvent, { data, isError, isLoading, isSuccess: updated }] =
    useUpdateEventMutation();
  useEffect(() => {
    if (eventId) setGot(true);
    console.log(eventId);
    console.log(eventData);
  }, [eventId]);
  useEffect(() => {
    if (updated) toast.success("Event Updated Successfully.");
  }, [updated]);
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [location, setLocation] = useState();
  const [thumbnail, setThumbnail] = useState(); // Assuming this is a file object
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]); // Assuming this is an array of tag IDs
  const [isPublic, setIsPublic] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState();
  const handleTagChange = (event) => {
    const selectedOptions = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value); // Extract selected tag IDs

    setTags(selectedOptions);
  };

  useEffect(() => {
    console.log(eventData);
    setName(eventData?.name);
    setDate(eventData?.date);
    setTime(eventData?.time);
    setLocation(eventData?.location);
    setThumbnailUrl(eventData?.thumbnail);
    setDescription(eventData?.description);
    setCategory(eventData?.category?.id);
    const t_ids = [];
    eventData?.tags.forEach((t) => {
      t_ids.push(t?.id);
    });
    setTags(t_ids);
    setIsPublic(eventData?.is_public);
  }, [eventData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the data for API call

    const updatedData = {
      name,
      date,
      time,
      location,
      description,
      category,
      tags,
      isPublic,
    };

    const body = { id: eventId, data: updatedData };
    updateEvent(body);
  };
  const handleThumbnailUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("thumbnail", profilePicture);

    // Send the data to the API
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    const body = { id: eventId, data: formData };
    updateEvent(body);
    setProfilePicture(null);
    setSelectedImage(null);
  };
  return (
    <Layout>
      <div className="flex my-3 flex-col items-center justify-center">
        <Card className="p-3">
          <form className="my-2" onSubmit={handleThumbnailUpload}>
            <ImageUpload
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              setProfilePicture={setProfilePicture}
            />
            <div className="flex justify-center items-center ">
              {profilePicture && (
                <Button
                  variant="outlined"
                  color="blue"
                  type="submit"
                  className="px-3 py-2"
                >
                  <div className="flex w-full justify-center items-center">
                    <img className="h-6 w-6" src={save} alt="" />
                    <p>Save</p>
                  </div>
                </Button>
              )}
            </div>
          </form>
          {!profilePicture && (
            <img
              className="h-40 w-full border-2 border-blue rounded"
              src={thumbnailUrl}
            />
          )}
        </Card>
        <form
          onSubmit={handleSubmit}
          className="w-1/2 p-3 shadow m-2 space-y-4 text-start"
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
            <label htmlFor="tags" className="text-gray-700 font-bold">
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
            Update Event
          </Button>
        </form>
      </div>
    </Layout>
  );
}
