"use client";

import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import SideBar from "./SideBar";
import Link from "next/link";
import Image from "next/image";
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
  { title: "FAQ", link: "/#faq" },
  { title: "CONTACT US", link: "/#contact" },
  { title: "VOLUNTEER", link: "/volunteer" },
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
            <Image
              src={avitaLogo}
              alt="Avita logo"
              width={144}
              height={48}
              className="object-cover"
              priority
            />
          </Link>

          <div className="flex justify-between items-center">
            <div className="mr-3 hidden md:block">
              <Link href="/signup">
                <button className="p-3 rounded-lg blue-border">Sign Up</button>
              </Link>
            </div>
            <button
              onClick={() => setToggle(true)}
              aria-label="Open mobile navigation"
              className="md:hidden"
            >
              <AiOutlineMenu size="2rem" color="#004680" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="blue hidden md:block">
        <ul className="flex justify-center">
          {list.map((item, index) => {
            const isExternal = item.link.startsWith("http");
            return isExternal ? (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <li className="mx-3 p-3 text-base lg:text-lg text-white hover:text-blue-300 hover:cursor-pointer transition-all">
                  {item.title}
                </li>
              </a>
            ) : (
              <Link key={index} href={item.link}>
                <li className="mx-3 p-3 text-base lg:text-lg text-white hover:text-blue-300 hover:cursor-pointer transition-all">
                  {item.title}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      {/* Mobile Sidebar with nav items */}
      <SideBar toggled={toggled} setToggle={setToggle} list={list} />
    </>
  );
};

export default NavBar;
