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
  {
    title: "AVITA HEALTH RESEARCH AND EDUCATION",
    link: "https://royalmedicsacademy.com/",
  },
  {
    title: "VOLUNTEER",
    link: "https://avitahealthng.com/volunteer",
  },
  { title: "FAQ", link: "/#faq" },
  { title: "CONTACT US", link: "/#contact" },
];

const NavBar = () => {
  const [toggled, setToggle] = useState(false);

  return (
    <>
      {/* Top Section with Logo and Menu */}
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

      {/* Desktop Navigation */}
      <div className="blue hidden md:block">
        <ul className="flex justify-center">
          {list.map((listItem, index) => {
            const isExternal = listItem.link.startsWith("http");
            return isExternal ? (
              <a
                key={index}
                href={listItem.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="mx-3 p-3 text-base lg:text-lg text-white hover:text-blue-300 hover:cursor-pointer transition-all">
                  {listItem.title}
                </li>
              </a>
            ) : (
              <Link key={index} href={listItem.link}>
                <li className="mx-3 p-3 text-base lg:text-lg text-white hover:text-blue-300 hover:cursor-pointer transition-all">
                  {listItem.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      {/* Mobile Sidebar */}
      <SideBar toggled={toggled} setToggle={setToggle} list={list} />
    </>
  );
};

export default NavBar;
