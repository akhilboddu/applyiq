// src/pages/ApplicationsPage.jsx
import { useEffect, useState } from "react";
import api from "../lib/api.js";
import ApplicationCard from "../components/applications/ApplicationCard.jsx";
import ApplicationForm from "../components/applications/ApplicationForm.jsx";
import Button from "../components/ui/Button.jsx";
import Modal from "../components/ui/Modal.jsx";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function loadApplications() {
      const { data } = await api.get("/applications");
      setApplications(data);
    }
    loadApplications();
  }, []);

  const handleCreated = (newRecord) => {
    setApplications((current) => [newRecord, ...current]);
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Applications</h1>
        <Button onClick={() => setIsOpen(true)}>New Application</Button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((app) => (
          <ApplicationCard key={app.id} app={app} />
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="New Application"
      >
        <ApplicationForm onCreated={handleCreated} />
      </Modal>
    </div>
  );
}
