"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const [country, setCountry] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    const selectedCountry = searchParams.get("country");
    const selectedDepartment = searchParams.get("department");

    if (selectedCountry) setCountry(selectedCountry);
    if (selectedDepartment) setDepartment(selectedDepartment);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Append selected values from state
    formData.append("country", country);
    formData.append("department", department);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Application submitted successfully!");
        e.target.reset(); // optional: reset form fields
      } else {
        alert("An error occurred while submitting.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Network error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Apply to Volunteer as a Medical Doctor
        </h1>

        <div className="mb-4">
          <p><strong>Selected Country:</strong> {country}</p>
          <p><strong>Selected Department:</strong> {department}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input type="text" name="fullName" className="w-full border p-2 rounded" placeholder="Your full name" required />
          </div>

          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input type="email" name="email" className="w-full border p-2 rounded" placeholder="your@email.com" required />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input type="tel" name="phone" className="w-full border p-2 rounded" placeholder="+234..." required />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload CV or Medical License</label>
            <input type="file" name="file" className="w-full" required />
          </div>

          <div>
            <label className="block font-medium mb-1">Why do you want to volunteer?</label>
            <textarea name="motivation" className="w-full border p-2 rounded" rows={4} placeholder="Your motivation and goals..." required />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
