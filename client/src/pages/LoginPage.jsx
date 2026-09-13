// src/pages/LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api.js";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";

export default function LoginPage({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      onSuccess?.(data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error ?? "Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-screen max-w-sm content-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Log in</h1>

      {error && (
        <p className="rounded border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Logging in…" : "Log in"}
        </Button>
      </form>
    </div>
  );
}
