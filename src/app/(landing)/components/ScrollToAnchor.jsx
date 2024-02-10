"use client"
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

function ScrollToAnchor() {

  const location = usePathname();
  const navigate = useRouter();
  const lastHash = useRef("");


  useEffect(() => {

    if (window) {
      if (location.includes("#")) {
        lastHash.current = location.split("#")[1];
      }

      if (lastHash.current && document.getElementById(lastHash.current)) {
        setTimeout(() => {
          document
            .getElementById(lastHash.current)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });

          navigate.replace(location.pathname, { scroll: true });

          lastHash.current = "";
        }, 100);
      }
    }


  }, [location, navigate]);

  return null;
}

export default ScrollToAnchor;
