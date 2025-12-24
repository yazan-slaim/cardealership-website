"use client";
import React, { useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import "@/app/gallery/gallery.css";

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

export default function CircularGallery() {
  useGSAP(() => {
    const gallery = document.querySelector(".gallery");
    const previewImage = document.querySelector(".preview-img img");

    document.addEventListener("mousemove", function (event) {
      const x = event.clientX;
      const y = event.clientY;

      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateX = 55 + percentY * 2;
      const rotateY = percentX * 2;

      gsap.to(gallery, {
        duration: 1,
        ease: "power2.out",
        rotateX,
        rotateY,
      });
    });

    // Create items
    for (let i = 0; i < 160; i++) {
      const item = document.createElement("div");
      item.className = "item";
      const img = document.createElement("img");
      img.src = `/assets/img (${i + 1}).jpg`;
      item.appendChild(img);
      gallery.appendChild(item);
    }

    const items = document.querySelectorAll(".item");
    const angleStep = 360 / items.length;

    items.forEach((item, index) => {
      gsap.set(item, {
        rotationY: 90,
        rotationZ: index * angleStep - 90,
        transformOrigin: "50% 400px",
        z: 0,
      });

      item.addEventListener("mouseover", () => {
        previewImage.src = item.querySelector("img").src;
        gsap.to(item, { z: 25, duration: 0.5 });
      });

      item.addEventListener("mouseout", () => {
        previewImage.src = `/assets/img (1).jpg`;
        gsap.to(item, { z: 0, duration: 0.5 });
      });
    });
  }, []);

  return (
    <>
      <div className="preview-img">
        <img src="/assets/img (1).jpg" alt="" />
      </div>

      <div className="container">
        <div className="gallery"></div>
      </div>
    </>
  );
}
