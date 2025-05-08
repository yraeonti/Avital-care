// app/layout.tsx
import "./globals.css"; // Adjust path if needed
import { ReactNode } from "react";

export const metadata = {
  title: "Medical Volunteer Program",
  description: "Volunteer as a doctor in Africa through our structured programs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        {children}
      </body>
    </html>
  );
}

