import React, { useEffect, useState } from "react";
import CustomCursor from "custom-cursor-react";
import "custom-cursor-react/dist/index.css";
import { useTheme } from "next-themes";

const Cursor = () => {
  const theme = useTheme();
  const [mount, setMount] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Get cursor color based on theme
  const getCustomColor = () => {
    if (theme.theme === "dark") {
      return "#fff";
    } else if (theme.theme === "light") {
      return "#000";
    }
  };

  // Detect if the current device is mobile based on screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setMount(true);
  }, []);

  // Render CustomCursor only if not on mobile
  return (
    <>
      {mount && !isMobile && (
        <CustomCursor
          targets={[".link"]}
          customClass="custom-cursor"
          dimensions={30}
          fill={getCustomColor()}
          smoothness={{
            movement: 0.2,
            scale: 0.1,
            opacity: 0.2,
          }}
          targetOpacity={0.5}
          targetScale={2}
        />
      )}
    </>
  );
};

export default Cursor;
