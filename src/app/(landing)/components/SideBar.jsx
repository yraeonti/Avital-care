/* eslint-disable react/prop-types */
import { IoMdExit } from "react-icons/io";
import { useRef, useEffect } from "react";
import Link from "next/link";

const SideBar = ({ toggled, setToggle, list }) => {
  const sideBarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setToggle]);

  return (
    <div
      ref={sideBarRef}
      style={{ zIndex: "99999999" }}
      className={`side-background fixed right-0 top-0 h-screen z-50 pl-4 pr-12 py-8 flex flex-col justify-start items-start md:hidden ${
        toggled
          ? "transition-transform ease-in duration-500 transform translate-x-0"
          : "transition-transform ease-out duration-500 transform translate-x-full"
      }`}
    >
      <button
        onClick={() => setToggle(false)}
        className="text-3xl text-white text-right hover:scale-125 transition-transform hover:cursor-pointer active:scale-75 mb-4"
      >
        <IoMdExit />
      </button>

      <ul>
        {list.map((item, index) => {
          const isExternal = item.link.startsWith("http");

          return isExternal ? (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setToggle(false)}
            >
              <li className="text-white text-lg border-b-2 border-white p-3 w-auto hover:bg-blue-800 hover:cursor-pointer transition-all">
                {item.title}
              </li>
            </a>
          ) : (
            <Link key={index} href={item.link} onClick={() => setToggle(false)}>
              <li className="text-white text-lg border-b-2 border-white p-3 w-auto hover:bg-blue-800 hover:cursor-pointer transition-all">
                {item.title}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBar;
