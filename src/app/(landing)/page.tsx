"use client"
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
            <Faq />
            <About />
        </>
    );
}
