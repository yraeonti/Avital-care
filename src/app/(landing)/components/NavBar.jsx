"use client";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import SideBar from "./SideBar";
import Link from "next/link";
import avitaLogo from "../assets/av4.png";

const list = [
  { title: "HOME", link: "/" },
  { title: "SERVICES", link: "/#services" },
  { title: "DOCTORS", link: "/doctors" },
  { title: "MY PORTAL", link: "/login" },
  { title: "AVITA HEALTH RESEARCH AND EDUCATION", link: "https://royalmedicsacademy.com/" },
  { title: "FAQ", link: "/#faq" },
  { title: "CONTACT US", link: "/#contact" },
];

const NavBar = () => {
  const [toggled, setToggle] = useState(false);

  return (
    <>
      <div
        style={{ borderBottomColor: "#004680" }}
        className="py-3 px-4 pl-0 border-b-2 lg:border-b-0"
      >
        <div className="flex justify-between items-center flex-wrap">
          <Link href="/">
            <img
              className="w-36 h-12 object-cover"
              src={avitaLogo.src}
              alt="website logo"
            />
          </Link>

          <div className="flex justify-between items-center">
            <div className="mr-3 hidden md:block">
              <button className="p-3 rounded-lg blue-border">
                <Link href="/signup">Sign Up</Link>
              </button>
            </div>
            <button onClick={() => setToggle(true)}>
              <span className="text-3x font-bold md:hidden">
                <AiOutlineMenu size="2rem" color="#004680" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Top Nav Bar */}
      <div className="blue hidden md:block">
        <ul className="flex justify-center">
          {list.map((listItem, index) => (
            <Link key={index} href={listItem.link}>
              <li className="mx-3 p-3 text-base lg:text-lg text-white hover:text-blue-300 hover:cursor-pointer transition-all">
                {listItem.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <SideBar toggled={toggled} setToggle={setToggle} />
    </>
  );
};

export default NavBar;
