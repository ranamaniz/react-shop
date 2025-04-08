import { useEffect, useState } from "react";

const useResponsive = () => {
  const [device, setDevice] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
  });

  const handleResize = () => {
    const deviceWidth = window.innerWidth;

    setDevice({
      isMobile: deviceWidth <= 768,
      isTablet: deviceWidth > 768 && deviceWidth <= 1024,
      isLaptop: deviceWidth > 1024 && deviceWidth <= 1920,
      isDesktop: deviceWidth > 1920,
    });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", () => {
      handleResize();
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
};

export default useResponsive;
