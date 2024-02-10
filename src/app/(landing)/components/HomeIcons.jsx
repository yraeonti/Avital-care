import doctor from "../assets/doctor.png";
import dStethoscope from "../assets/doctorsStethoscope.png";
import laboratory from "../assets/laboratory.png";
import meter from "../assets/spectrophotometer.png";
import Link from "next/link";

const HomeIcons = () => {
  const items = [
    {
      icon: doctor,
      heading: "TELEHEALTH SERVICES",
      paragraph: "We offer the best TeleHealth Services",
    },
    {
      icon: meter,
      heading: "DIAGNOSTIC IMAGING",
      paragraph: "Accurate Diagnostic Imaging",
    },
    {
      icon: dStethoscope,
      heading: "MENTAL HEALTH & COUNSELING",
      paragraph: "Specialized care, close to home",
    },
    {
      icon: laboratory,
      heading: "LABORATORY TEST",
      paragraph: "We offer Accurate Results",
    },
  ];
  return (
    <div id="services" className="py-12 px-6">
      <div className="home-icons text-center">
        {items.map((item, index) => (
          <div
            className="rounded-md p-6 hover-icons"
            style={{ border: "3px solid #004680" }}
            key={index}
          >
            <Link
              className="flex flex-col justify-center items-center text-center"
              href="/signup"
            >
              <img className="text-center" src={item.icon.src} alt="" />
              <h2 className="sm:text-base md:text-lg lg:text-2xl my-1">
                {item.heading}
              </h2>
              <p className="mb-4 hover">{item.paragraph}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeIcons;
