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
      await updateProfile(body).unwrap();
      toast.success("Profile picture updated successfully!");
    } catch (error) {
      toast.error("Error updating profile picture!");
    }
    setProfilePicture(null);
    setSelectedImage(null);
  };

  return (
    <Layout>
      {profileLoading ? (
        <>
          <UpdateProfileSkeleton />
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <div className="flex my-2 flex-col justify-center items-center">
              <div>
                <img
                  className="h-60 w-60 rounded-full object-cover object-center shadow-xl shadow-blue-gray-900/50"
                  src={user?.image}
                  alt="profile image"
                />
              </div>
              <CardBody>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {capitalizeFirstLetter(user?.user.first_name)}{" "}
                  {capitalizeFirstLetter(user?.user.last_name)}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium"
                  textGradient
                >
                  {user?.role ? makeUppercase(user?.role) : ""}
                </Typography>
              </CardBody>
              <form onSubmit={handleProfilePictureUpload}>
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
            </div>
          </div>
          <div className="flex col-span-2 flex-2 my-3 flex-col items-center justify-center">
            <form onSubmit={handleSubmit} className="p-3 w-full m-2 space-y-4">
              <Typography className="text-start  flex justify-end  items-center font-bold">
                Update Info
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
                </svg>
              </Typography>
              <Input
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                variant="static"
                label="first_name"
                placeholder="type your name"
              />

              <Input
                variant="static"
                label="last_name"
                placeholder="type your name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
              />
              <Input
                type="text"
                variant="static"
                label="email"
                placeholder="type your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <hr />
              <Typography className="text-start items-center  flex justify-end  font-bold">
                Settings
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Typography>
              <Select
                size="md"
                label="Select Version"
                className="border rounded-md px-4 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={freq}
                onChange={(e) => setFreq(e)}
              >
                {FREQUENCY?.map((tag) => (
                  <Option key={tag.id} value={tag.id}>
                    {tag.name}
                  </Option>
                ))}
              </Select>
              <div>
                <Checkbox
                  checked={notification}
                  onChange={(e) => setNotification(e.target.checked)}
                  ripple={false}
                  label="Email Notifications"
                  className="block"
                />
              </div>
              <div>
                <Checkbox
                  checked={in_app}
                  onChange={(e) => setInApp(e.target.checked)}
                  label="In-App Notifications"
                />
              </div>

              <Button
                type="submit"
                variant="rounded"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}
