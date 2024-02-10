import { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import {
  MdOutlineHealthAndSafety,
  MdOutlineMedicalServices,
  MdPregnantWoman,
} from "react-icons/md";
import Link from "next/link";

const WaitTimes = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div
        style={{
          background: "rgba(45,41,38,1)",
          padding: "1rem 0",
        }}
      >
        <div className="flex justify-center items-center">
          <h2 className="text-white text-center sm:text-2xl md:text-3xl lg:text-5xl">
            Services
          </h2>
          <span
            onClick={() => setVisible(!visible)}
            className="relative left-1 cursor-pointer transition-opacity duration-300 ease-in-out"
          >
            <FaInfoCircle color="#f0b410" />
          </span>
        </div>
        {visible && (
          <div
            className={`px-2 transition-opacity duration-500 ease-in-out ${visible ? "opacity-100" : "opacity-0 hidden"
              }`}
          >
            <p className="text-center text-white mt-3 text-sm">
              Welcome to our healthcare oasis, where compassion meets
              innovation. Here we seamlessly blend excellence in hospitals, home
              health services, medical tourism, and telemedicine. Whether
              you&apos;re seeking top-notch facilities, personalized home care,
              exploring medical tourism, or expert telemedicine advice,
              we&apos;re here for you. Join us on a journey where health,
              healing, and hope converge.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* primary core */}
        <div className="bucyrus py-5 border-b-2 border-white md:border-b-0 md:w-1/3 md:border-r-2">
          <div className="flex flex-row md:flex-col flex-grow-0 flex-shrink justify-center items-center text-white text-sm md:text-lg lg:text-2xl text-shadow">
            <h3 className="mr-4">
              <Link
                className="text-nowrap"
                href="/signup"
              >
                PRIMARY CARE
              </Link>
            </h3>
            <p className="flex items-center">
              <span>
                <MdOutlineHealthAndSafety size="2.4rem" />
              </span>
            </p>
          </div>
        </div>

        {/* maternity women */}
        <div className="gallion py-5 border-b-2 border-white md:border-b-0 md:w-1/3 md:border-r-2">
          <div className="flex flex-row md:flex-col flex-grow-0 flex-shrink justify-center items-center text-white text-sm md:text-lg lg:text-2xl text-shadow">
            <h3 className="mr-4">
              <Link href="/signup">
                MATERNAL HEALTH CARE
              </Link>
            </h3>
            <p className="flex items-center">
              <span>
                <MdPregnantWoman size="2.4rem" />
              </span>
            </p>
          </div>
        </div>

        {/* specialized consultation*/}
        <div className="ontario py-5 border-b border-white md:border-b-0 md:w-1/3">
          <div className="flex flex-row md:flex-col flex-grow-0 flex-shrink justify-center items-center text-white text-sm md:text-lg lg:text-2xl text-shadow">
            <h3 className="mr-4">
              <Link href="/signup">
                SPECIALIZED CONSULTATION
              </Link>
            </h3>
            <p className="flex items-center flex-shrink">
              <span>
                <MdOutlineMedicalServices size="2.4rem" />
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitTimes;
