import React, { useEffect, useState } from "react";
import { IconArrowUpCom } from "../icon";

const ScrollToTopCom = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = () =>
    window.scrollY > 100
      ? setShowScrollButton(true)
      : setShowScrollButton(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-10 right-10 bg-tw-primary p-3 text-white rounded animate-bounce rounded-full cursor-pointer z-20 tw-transition-all ${
        showScrollButton ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <IconArrowUpCom />
    </div>
  );
};

export default ScrollToTopCom;
