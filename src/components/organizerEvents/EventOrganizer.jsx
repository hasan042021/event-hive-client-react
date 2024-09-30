import Layout from "../common/Layout";
import OrganizersEventDetails from "./OrganizersEventDetails";

export default function EventOrganizer({ events }) {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        {events?.map((e) => (
          <OrganizersEventDetails event={e} />
        ))}
      </div>
    </Layout>
  );
}
