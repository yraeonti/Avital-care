"use client";

import Link from "next/link";

import About from "./components/About";
import Banner from "./components/Banner";
import Carousel from "./components/Carousel";
import Faq from "./components/Faq";
import HomeBanner from "./components/HomeBanner";
import HomeIcons from "./components/HomeIcons";
import VideoContainer from "./components/VideoContainer";
import WaitTimes from "./components/WaitTimes";

export default function Page() {
    return (
        <>
            <VideoContainer />
            <WaitTimes />
            <Banner />
            <Carousel />
            <HomeBanner />
            <HomeIcons />

            {/* 🔗 Added the new link here */}
            <div className="text-center my-6">
                <Link href="/research">
                    <span className="text-blue-600 hover:underline font-semibold text-lg">
                        Avita Health Research and Education
                    </span>
                </Link>
            </div>

            <Faq />
            <About />
        </>
    );
}
