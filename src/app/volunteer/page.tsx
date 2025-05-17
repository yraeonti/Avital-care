"use client";
import React, { useState } from "react";
import Image from "next/image";

const countries = {
  Nigeria: {
    image: "/nigeria.jpeg",
    duration: "2-12 weeks",
    cost: "From 2300 USD",
    price: 230000, // in kobo
    description:
      "Engage in Nigeria’s bustling healthcare system, contributing to patient care and health education across urban and rural communities.",
    highlights: ["Urban Hospitals", "Outreach Programs", "Health Education"],
    requirements: ["Medical License", "English Proficiency", "Immunization Proof"],
    location: "Lagos and other major cities",
    accommodation: "Shared housing with meals included",
  },
  Ghana: {
    image: "/ghana.jpeg",
    duration: "1-16 weeks",
    cost: "From 2500 USD",
    price: 250000,
    description:
      "Volunteer in Ghana’s friendly healthcare environment. Gain hands-on experience in hospitals and rural health centers.",
    highlights: ["Teaching Hospitals", "Mobile Clinics", "Community Health"],
    requirements: ["Medical Degree", "Valid License", "Health Clearance"],
    location: "Accra and nearby regions",
    accommodation: "Volunteer dorms or homestay with meals",
  },
  "Sierra Leone": {
    image: "se.jpeg",
    duration: "2-20 weeks",
    cost: "From 2300 USD",
    price: 230000,
    description:
      "Support rebuilding efforts of Sierra Leone’s health system. Work with local doctors and help underserved communities.",
    highlights: ["Rural Clinics", "Medical Outreach", "Child Health Programs"],
    requirements: ["Medical License", "Work Permit", "Background Check"],
    location: "Freetown and rural districts",
    accommodation: "Group housing or family host options",
  },
};

const departments = [
  "Internal Medicine",
  "Pediatrics",
  "Surgery",
  "Obstetrics & Gynecology",
  "Public Health",
  "Emergency Medicine",
  "General Practice",
];

export default function VolunteerPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async () => {
    if (!email || !selectedDepartment || !selectedCountry) {
      alert("Please fill all fields.");
      return;
    }

    const amount = countries[selectedCountry].price;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/paystack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount,
          metadata: {
            department: selectedDepartment,
            country: selectedCountry,
          },
        }),
      });

      const data = await res.json();
      if (data?.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        alert("Payment initiation failed.");
      }
    } catch (err) {
      alert("Error occurred. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <section
        className="text-white text-center py-20 mb-12"
        style={{
          backgroundImage: "url('/africa.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Volunteer and Work as a Medical Doctor in Africa</h1>
          <p className="text-xl">Join our medical volunteer program and make a difference</p>
        </div>
      </section>

      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(countries).map(([country, details]) => (
          <div key={country} className="relative bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="absolute top-2 right-2 bg-green-600 text-white px-3 py-1 rounded text-sm z-10">
              {details.cost}
            </div>
            <Image
              src={details.image}
              alt={country}
              width={400}
              height={200}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{country}</h3>
              <span className="inline-block bg-blue-500 text-white text-sm px-2 py-1 rounded mb-3">
                Structured program for medical students and Doctors
              </span>
              <p className="text-gray-700 text-sm mb-4">{details.description}</p>

              <div className="mb-3">
                <h5 className="font-semibold">Program Highlights:</h5>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {details.highlights.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-3">
                <h5 className="font-semibold">Key Information:</h5>
                <ul className="text-sm text-gray-600">
                  <li><strong>Duration:</strong> {details.duration}</li>
                  <li><strong>Location:</strong> {details.location}</li>
                  <li><strong>Accommodation:</strong> {details.accommodation}</li>
                </ul>
              </div>

              <div className="mb-4">
                <h5 className="font-semibold">Requirements:</h5>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {details.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => setSelectedCountry(country)}
              >
                Choose Department
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for department selection and payment */}
      {selectedCountry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Select Department - {selectedCountry}</h3>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-2 mb-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <select
              className="w-full border p-2 mb-4 rounded"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">-- Select Department --</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>

            <button
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mb-2"
              onClick={handlePayment}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Proceed to Pay"}
            </button>

            <button
              className="w-full bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setSelectedCountry(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
