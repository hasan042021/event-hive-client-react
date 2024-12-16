import React, { useEffect, useState } from "react";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../features/profile/profileApi";
import Layout from "../../components/common/Layout";
import save from "../../assets/images/save.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Chip,
  Input,
  Option,
  Select,
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  capitalizeFirstLetter,
  capitalizeWords,
  makeUppercase,
} from "../../utils/array_funcs";
import ImageUpload from "../../components/common/ImageUpload";
import { toast, ToastContainer } from "react-toastify";
import UpdateProfileSkeleton from "../../components/skeletons/UpdateProfileSkeleton";
const FREQUENCY = [
  { id: "daily", name: "Daily" },
  { id: "weekly", name: "Weekly" },
  { id: "monthly", name: "Monthly" },
];

export default function UpdateProfile() {
  const { id } = useSelector((state) => state.auth.user);
  const [now, setNow] = useState(false);
  const {
    data: user,
    isSuccess,
    isLoading: profileLoading,
  } = useGetProfileQuery(id, {
    skip: !now,
  });
  const [updateProfile] = useUpdateProfileMutation();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [notification, setNotification] = useState("");
  const [in_app, setInApp] = useState("");
  const [freq, setFreq] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (id) setNow(true);
  }, [id]);

  useEffect(() => {
    setFirstName(user?.user.first_name);
    setLastName(user?.user.last_name);
    setEmail(user?.user.email);
    setNotification(user?.receive_email_notifications);
    setInApp(user?.receive_in_app_notifications);
    setFreq(user?.notification_frequency);
  }, [user]);

  async function handleSubmit(e) {
    e.preventDefault();
    const userEdited = {
      first_name,
      last_name,
      email,
    };
    const data = {
      user: userEdited,
      receive_email_notifications: notification,
      receive_in_app_notifications: in_app,
      notification_frequency: freq,
    };
    console.log(data);
    try {
      await updateProfile({ id, data }).unwrap();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Error updating profile!");
    }
  }

  const handleProfilePictureUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", profilePicture);

    const body = { id: id, data: formData };
    try {
      const res = await updateProfile(body).unwrap();
      console.log(res);
      toast.success("Profile picture updated successfully!");
      setProfilePicture(null);
      setSelectedImage(null);
    } catch (error) {
      toast.error("Error updating profile picture!");
      setProfilePicture(null);
      setSelectedImage(null);
    }
  };

  return (
    <Layout>
      {profileLoading ? (
        <>
          <UpdateProfileSkeleton />
        </>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl mx-auto">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="text-center">
                  <div className="relative text-center">
                    {/* Profile Image */}
                    <img
                      src={
                        selectedImage ||
                        user?.image_url ||
                        "https://via.placeholder.com/150"
                      }
                      alt="Profile"
                      className="md:w-44 h-28 w-28 md:h-44 rounded-full border-4 border-white shadow-lg mx-auto mb-4 cursor-pointer"
                      onClick={() => setIsPopupOpen(true)}
                    />

                    {/* Magnifier Icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white bg-black bg-opacity-50 p-1 rounded-full shadow-md"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="16" y1="16" x2="22" y2="22" />
                      </svg>
                    </div>

                    {/* Popup */}
                    {isPopupOpen && (
                      <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
                        onClick={() => setIsPopupOpen(false)} // Close on background click
                      >
                        <div className="relative">
                          <img
                            src={
                              selectedImage ||
                              user?.image_url ||
                              "https://via.placeholder.com/150"
                            }
                            alt="Expanded Profile"
                            className="max-w-full max-h-screen rounded-lg shadow-lg"
                          />
                          <button
                            className="absolute top-2 right-2 bg-white rounded-full text-black bg-opacity-50 p-2 "
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent closing on button click
                              setIsPopupOpen(false);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    {capitalizeFirstLetter(user?.user.first_name)}{" "}
                    {capitalizeFirstLetter(user?.user.last_name)}
                  </h2>
                  <p className="text-blue-100 font-medium">
                    {user?.role ? makeUppercase(user?.role) : ""}
                  </p>
                </div>

                <form onSubmit={handleProfilePictureUpload} className="mt-8">
                  <ImageUpload
                    setProfilePicture={setProfilePicture}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                  />
                  {profilePicture && (
                    <button
                      type="submit"
                      className="mt-4 w-full bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 ease-in-out"
                    >
                      Save Picture
                    </button>
                  )}
                </form>
              </div>
              <div className="md:w-1/2 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Update Profile
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="frequency"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Update Frequency
                    </label>
                    <select
                      id="frequency"
                      value={freq}
                      onChange={(e) => setFreq(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {FREQUENCY?.map((tag) => (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Email Notifications
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notification}
                        onChange={(e) => setNotification(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      In-App Notifications
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={in_app}
                        onChange={(e) => setInApp(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
