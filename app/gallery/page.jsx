"use client";

import React, { useState, useEffect } from "react";
import HorizontalGallery from "@/components/Galleries/HorizontalGallery";
import CircularGallery from "@/components/Galleries/CircularGallery";

export default function Page() {
  const [mode, setMode] = useState("circular");

  const toggleMode = () => {
    setMode((prev) => (prev === "circular" ? "horizontal" : "circular"));
  };

  useEffect(() => {
    if (mode === "horizontal") {
      document.body.classList.add("hide-footer");
    } else {
      document.body.classList.remove("hide-footer");
    }

    return () => {
      document.body.classList.remove("hide-footer");
    };
  }, [mode]);

  const isCircular = mode === "circular";

  return (
    <div className="gallery-parent">
      <nav
        style={{
          marginTop: "100px",
          zIndex: 999999,
          display: "flex",
          gap: "12px",
          alignItems: "center",
        }}
      >
        <button
          onClick={toggleMode}
          className="gallery-toggle-btn"
          aria-label={
            isCircular
              ? "Switch to horizontal gallery"
              : "Switch to circular gallery"
          }
        >
          {isCircular ? (
            // CIRCULAR ICON (outline only)
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="16"
                cy="16"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <circle
                cx="16"
                cy="7"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle
                cx="25"
                cy="16"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle
                cx="16"
                cy="25"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <circle
                cx="7"
                cy="16"
                r="2"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          ) : (
            // HORIZONTAL ICON (outline only)
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* base line */}
              <line
                x1="4"
                y1="16"
                x2="28"
                y2="16"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              {/* horizontal cards as outlines */}
              <rect
                x="4"
                y="10"
                width="5"
                height="12"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect
                x="10.5"
                y="10"
                width="5"
                height="12"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect
                x="17"
                y="10"
                width="5"
                height="12"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <rect
                x="23.5"
                y="10"
                width="5"
                height="12"
                rx="1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
          )}
        </button>
      </nav>

      {isCircular ? <CircularGallery /> : <HorizontalGallery />}
    </div>
  );
}
