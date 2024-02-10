"use client"
import { useEffect, useState } from "react";
import { BiArrowToTop } from "react-icons/bi";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 180) {
          setVisible(true);
        } else setVisible(false);
      });
    }

  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {visible && (
        <span
          style={{
            zIndex: "9999",
            borderRadius: "100%",
            backgroundColor: "rgba(0, 70, 128, 0.7)",
          }}
          onClick={scrollUp}
          className="fixed bottom-6 right-3 h-12 w-12 flex items-center justify-center text-white hover:scale-110 transition-all duration-100 hover:cursor-pointer"
        >
          <BiArrowToTop size="1.6rem" />
        </span>
      )}
    </div>
  );
};

export default ScrollToTop;
