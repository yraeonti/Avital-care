"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [motivation, setMotivation] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const c = searchParams.get("country");
    const d = searchParams.get("department");
    if (c) setCountry(c);
    if (d) setDepartment(d);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !cvFile) {
      alert("Please fill in all required fields and upload your CV.");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("country", country);
    formData.append("department", department);
    formData.append("motivation", motivation);
    formData.append("cvFile", cvFile);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Application submitted successfully!");
        setFullName("");
        setEmail("");
        setPhone("");
        setCvFile(null);
        setMotivation("");
      } else {
        setMessage(data.error || "Failed to submit application.");
      }
    } catch (err) {
      setMessage("An error occurred while submitting.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Apply to Volunteer as a Medical Doctor
        </h1>

        <div className="mb-4">
          <p>
            <strong>Selected Country:</strong> {country}
          </p>
          <p>
            <strong>Selected Department:</strong> {department}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="w-full border p-2 rounded"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              className="w-full border p-2 rounded"
              placeholder="+234..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Upload CV or Medical License <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              className="w-full"
              onChange={(e) => e.target.files && setCvFile(e.target.files[0])}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">
              Why do you want to volunteer?
            </label>
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              placeholder="Your motivation and goals..."
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 font-semibold">{message}</p>
        )}
      </div>
    </div>
  );
}
