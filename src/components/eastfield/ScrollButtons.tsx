import { useState, useEffect } from "react";
import { ArrowLeft } from "../ui/icons";

export default function ScrollButtons() {
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(true); // ALWAYS VISIBLE FOR NOW

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setVisible(currentScrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ALWAYS RENDER FOR DEBUGGING
  return (
    <div
      style={{
        position: "fixed",
        bottom: "90px",
        right: "25px",
        zIndex: 2147483647, // Maximum possible z-index
        pointerEvents: "auto",
      }}
    >
      <button
        onClick={() =>
          window.open("https://urbanestrealty.in/", "_blank", "noopener,noreferrer")
        }
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          backgroundColor: "#c9980b",
          border: "none",
          color: "#000000",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 0 20px rgba(201, 152, 11, 0.6), inset 0 0 25px rgba(255, 255, 255, 0.4)",
          transition: "all 0.3s ease",
          outline: "none",
          padding: "0",
          margin: "0",
          fontWeight: "bold",
          fontSize: "10px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.15)";
          e.currentTarget.style.backgroundColor = "#b8860b";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "#c9980b";
        }}
      >
        <ArrowLeft size={28} strokeWidth={3} />
      </button>
    </div>
  );
}