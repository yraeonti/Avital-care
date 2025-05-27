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

        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input type="text" className="w-full border p-2 rounded" placeholder="Your full name" />
          </div>

          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <input type="email" className="w-full border p-2 rounded" placeholder="your@email.com" />
          </div>

          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input type="tel" className="w-full border p-2 rounded" placeholder="+234..." />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload CV or Medical License</label>
            <input type="file" className="w-full" />
          </div>

          <div>
            <label className="block font-medium mb-1">Why do you want to volunteer?</label>
            <textarea className="w-full border p-2 rounded" rows={4} placeholder="Your motivation and goals..." />
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

