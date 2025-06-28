"use client";
import Head from "next/head";
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
            <Head>
                {/* ✅ Google Search Console Verification */}
                <meta name="google-site-verification" content="PITOon_qXlS-_EeWidyKwyKPFxgRk15rO8qhrU8-zIY" />

                <title>Avita Health NG – Wellness & Healthcare in Nigeria</title>
                <meta name="description" content="Avita Health NG offers diagnostics, wellness programs, and corporate healthcare services across Nigeria." />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://avitahealthng.com/" />

                {/* Open Graph */}
                <meta property="og:title" content="Avita Health NG – Wellness & Healthcare in Nigeria" />
                <meta property="og:description" content="Your trusted partner for affordable, premium medical services across Nigeria." />
                <meta property="og:image" content="https://avitahealthng.com/og-image.jpg" />
                <meta property="og:url" content="https://avitahealthng.com" />
                <meta property="og:type" content="website" />

                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Avita Health NG – Healthcare in Nigeria" />
                <meta name="twitter:description" content="Explore wellness, diagnostics, and more with Avita Health." />
                <meta name="twitter:image" content="https://avitahealthng.com/og-image.jpg" />

                {/* Schema.org JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "MedicalOrganization",
                            "name": "Avita Health NG",
                            "url": "https://avitahealthng.com",
                            "logo": "https://avitahealthng.com/logo.png",
                            "address": {
                                "@type": "PostalAddress",
                                "addressCountry": "NG"
                            },
                            "description": "Premium diagnostics, family medicine, and corporate wellness in Nigeria."
                        })
                    }}
                />
            </Head>

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
