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
import { useSelector } from "react-redux";
import { useGetProfileQuery } from "../../features/profile/profileApi";

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
    setThumbnailUrl(eventData?.thumbnail_url);
    setDescription(eventData?.description);
    setCategory(eventData?.category?.id);
    const t_ids = [];
    eventData?.tags.forEach((t) => {
      t_ids.push(t?.id);
    });
    setTags(t_ids);
    setIsPublic(eventData?.is_public);
  }, [eventData]);
  const { id: org_id } = useSelector((state) => state?.auth?.user);
  console.log("org_id", org_id);

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
      organizer_id: Number(org_id),
    };

    const body = { id: eventId, data: updatedData };
    updateEvent(body);
  };
  const handleThumbnailUpload = (e) => {
    e.preventDefault();
    console.log(org_id);
    const formData = new FormData();
    formData.append("thumbnail", profilePicture);
    formData.append("organizer_id", Number(org_id));

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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 p-8 bg-gradient-to-br from-blue-500 to-purple-600">
              <Typography variant="h4" color="white" className="mb-6">
                Event Details
              </Typography>
              <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6">
                {!profilePicture && (
                  <img
                    className="h-40 w-full object-cover rounded-lg mb-2"
                    src={thumbnailUrl}
                    alt="Event thumbnail"
                  />
                )}
                <form onSubmit={handleThumbnailUpload} className="space-y-4">
                  <ImageUpload
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    setProfilePicture={setProfilePicture}
                  />
                  {profilePicture && (
                    <Button
                      variant="outlined"
                      color="white"
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <img className="h-5 w-5" src={save} alt="" />
                      <span className="text-blue">Save</span>
                    </Button>
                  )}
                </form>
              </Card>
            </div>
            <div className="md:w-2/3 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Name
                  </label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                    placeholder="Enter event name"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Date
                    </label>
                    <Input
                      id="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      variant="outlined"
                      type="date"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Time
                    </label>
                    <Input
                      id="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      variant="outlined"
                      type="time"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Location
                  </label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    variant="outlined"
                    placeholder="Enter location"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                    placeholder="Enter event description"
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  >
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tags
                  </label>
                  <select
                    id="tags"
                    multiple
                    value={tags}
                    onChange={handleTagChange}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 h-32"
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
                    id="isPublic"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                    color="blue"
                  />
                  <label
                    htmlFor="isPublic"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Make this event public
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:from-blue-600 hover:to-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Update Event
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
