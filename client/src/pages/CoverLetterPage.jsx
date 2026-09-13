// src/pages/CoverLetterPage.jsx
import { useEffect, useState } from "react";
import api, { API_ORIGIN } from "../lib/api.js";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

export default function CoverLetterPage() {
  const [form, setForm] = useState({
    applicationId: "",
    jobTitle: "",
    companyName: "",
    jobDescription: "",
    candidateSkills: "",
    tone: "professional",
  });
  const [applications, setApplications] = useState([]);
  const [streamedContent, setStreamedContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function loadApplications() {
      const { data } = await api.get("/applications");
      setApplications(data);
      setForm((previous) => ({
        ...previous,
        applicationId: previous.applicationId || data[0]?.id || "",
      }));
    }
    loadApplications();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  // Two applications can share a company/role, and the select keys on the
  // option text — so disambiguate collisions with a slice of the id.
  const applicationOptions = applications.map((app, index, all) => {
    const base = `${app.companyName} — ${app.role}`;
    const isAmbiguous =
      all.filter((other) => `${other.companyName} — ${other.role}` === base)
        .length > 1;
    return { id: app.id, label: isAmbiguous ? `${base} (${app.id.slice(-4)})` : base };
  });

  function handleApplicationChange(event) {
    const match = applicationOptions.find(
      (option) => option.label === event.target.value,
    );
    setForm((previous) => ({ ...previous, applicationId: match?.id ?? "" }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStreamedContent("");
    setIsGenerating(true);

    // fetch, not the axios instance — axios buffers the whole response
    // and the text would land in one lump instead of typing itself.
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_ORIGIN}/api/ai/cover-letter/stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          candidateSkills: form.candidateSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        }),
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setStreamedContent((previous) => previous + decoder.decode(value));
      }
    } finally {
      setIsGenerating(false);
    }
  }

  const selectedOption = applicationOptions.find(
    (option) => option.id === form.applicationId,
  );

  const isIncomplete =
    !form.applicationId ||
    !form.jobTitle ||
    !form.companyName ||
    !form.jobDescription ||
    !form.candidateSkills;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Cover Letter</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="grid content-start gap-4">
          <Input
            label="Application"
            name="applicationId"
            type="select"
            value={selectedOption?.label ?? ""}
            onChange={handleApplicationChange}
            options={applicationOptions.map((option) => option.label)}
            required
          />
          <Input
            label="Job Title"
            name="jobTitle"
            value={form.jobTitle}
            onChange={handleChange}
            required
          />
          <Input
            label="Company Name"
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            required
          />
          <Input
            label="Job Description"
            name="jobDescription"
            value={form.jobDescription}
            onChange={handleChange}
            required
          />
          <Input
            label="Your Skills"
            name="candidateSkills"
            value={form.candidateSkills}
            onChange={handleChange}
            required
          />
          <Input
            label="Tone"
            name="tone"
            type="select"
            value={form.tone}
            onChange={handleChange}
            options={["professional", "enthusiastic", "formal"]}
          />
          <Button type="submit" disabled={isGenerating || isIncomplete}>
            {isGenerating ? "Generating…" : "Generate"}
          </Button>
        </form>

        <div className="min-h-64 rounded-lg border border-gray-200 p-4">
          {streamedContent ? (
            <p className="whitespace-pre-wrap text-sm">{streamedContent}</p>
          ) : (
            <p className="text-sm text-gray-400">
              Your generated letter will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
