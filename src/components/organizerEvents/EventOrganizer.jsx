import { Typography } from "@material-tailwind/react";
import Layout from "../common/Layout";
import OrganizersEventDetails from "./OrganizersEventDetails";
import notFoundImg from "../../assets/images/undraw_empty_re_opql.svg";

export default function EventOrganizer({ events }) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        {events?.length == 0 ? (
          <div className="h-[100vh] flex-col flex items-center justify-center">
            <img src={notFoundImg} className="w-80" alt="" />
            <Typography variant="h6">
              You have created any event yet.
            </Typography>
          </div>
        ) : (
          events?.map((e) => <OrganizersEventDetails event={e} />)
        )}
      </div>
    </Layout>
  );
}
