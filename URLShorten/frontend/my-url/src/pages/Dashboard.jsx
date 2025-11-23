import { useEffect, useState } from "react";
import { getLinks } from "../services/api";
import CreateForm from "../components/CreateForm";
import LinkTable from "../components/LinkTable";

export default function Dashboard() {
  const [links, setLinks] = useState([]);

  async function loadLinks() {
    const data = await getLinks();
    setLinks(data);
  }

  useEffect(() => {
    loadLinks();
  }, []);

  return (
    <div className="page">
      <CreateForm onCreated={loadLinks} />

      <h2>Your Links</h2>
      <LinkTable links={links} refresh={loadLinks} />
    </div>
  );
}
