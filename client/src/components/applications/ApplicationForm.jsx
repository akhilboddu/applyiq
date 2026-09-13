// src/components/applications/ApplicationForm.jsx
import { useState } from "react";
import api from "../../lib/api.js";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import { STATUSES } from "../../lib/statuses.js";

const fields = [
  { name: "companyName", label: "Company", type: "text", required: true },
  { name: "role", label: "Job Title", type: "text", required: true },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: STATUSES,
  },
  { name: "salary", label: "Salary", type: "number", required: false },
  { name: "location", label: "Location", type: "text", required: false },
  { name: "appliedDate", label: "Applied At", type: "date", required: false },
];

const emptyValues = {
  companyName: "",
  role: "",
  status: "Applied",
  salary: "",
  location: "",
  appliedDate: "",
};

const validate = (data) => {
  const errors = {};
  if (!data.companyName) errors.companyName = "Company is required";
  if (!data.role) errors.role = "Job title is required";
  if (data.salary && data.salary < 0) errors.salary = "Salary must be positive";
  return errors;
};

export default function ApplicationForm({ onCreated, initialValues = {} }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ ...emptyValues, ...initialValues });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value }); // generic binder

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      ...form,
      salary: form.salary === "" ? null : Number(form.salary),
      appliedDate: form.appliedDate
        ? new Date(form.appliedDate).toISOString()
        : undefined,
      location: form.location || null,
    };
    const { data } = await api.post("/applications", payload);
    onCreated(data);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      {fields.map((field) => (
        <Input
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          required={field.required}
          options={field.options}
          value={form[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}

      <div className="sm:col-span-2">
        <Button type="submit">Add application</Button>
      </div>
    </form>
  );
}
