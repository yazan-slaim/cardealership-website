"use client";
import { useActiveSection } from "@/contexts/ActiveSection";
import { useMenu } from "@/contexts/MenuContext";
import { MenuIcon } from "@/public/svgs/Menu-Icon";
import styled from "@emotion/styled";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ContainersNav from "./ContainersNav";
import Link from "next/link";

const StyledHeader = styled.header`
  position: ${(props) => (props.NotTest ? "relative" : "fixed")};

  width: 100%;
  overflow-x: hidden;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
  justify-content: center;
  align-items: center;
  color: white;
  //background: black;
  // mix-blend-mode: difference;
`;

const StyledNav = styled.nav`
  display: flex;
  background: ${(props) => (props.NotTest ? "transparent" : "transparent")};
  z-index: 98;
  justify-content: space-between;
  align-items: center;
  width: ${(props) =>
    props.NotTest ? "100vw" : props.isCompact ? "100vw" : "95%"};

  padding: ${(props) => (props.isCompact ? "10px 20px" : "40px 20px")};

  border-bottom: ${(props) =>
    props.isCompact ? "none" : "1px solid rgba(255, 255, 255, 0.3)"};
  color: white;
  backdrop-filter: ${(props) => (props.isCompact ? "none" : "none")};
  transition: all 0.5s ease-in-out;
  div {
    flex: 1;
    transition: opacity 0.5s ease;
    display: flex;
    gap: 5px;
    align-items: center;
  }
  button {
    flex: 1;
    transition: opacity 0.5s ease;
    display: flex;
    gap: 5px;
    align-items: center;
  }
  h1 {
    font-size: large;
    font-family: "Inter", sans-serif;
  }
`;

export default function Header() {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const [prevPath, setPrevPath] = useState(pathname);
  const [interactive, setInteractive] = useState(true);

  useEffect(() => {
    if (prevPath !== pathname) {
      setInteractive(false); // Disable interactivity
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.7,
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 1,
            duration: 0.7,
            delay: 2.2,
            onComplete: () => {
              setInteractive(true);
            },
          });
        },
      });

      setPrevPath(pathname);
    }
  }, [pathname, prevPath]);
  const { currentSectionIndex } = useActiveSection();
  const isCompact = currentSectionIndex !== 0;
  const { openMenu } = useMenu();

  const [lastScrollY, setLastScrollY] = useState(0);

  const [showExtraComponents, setShowExtraComponents] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShowExtraComponents(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowExtraComponents(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <StyledHeader
      NotTest={pathname !== "/"}
      ref={containerRef}
      interactive={interactive}
    >
      <StyledNav isCompact={isCompact} NotTest={pathname !== "/"}>
        <button onClick={openMenu}>
          <MenuIcon />
          MENU
        </button>
        <h1>LOGO</h1>
        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
          <Link href={"/"}>Home</Link>
          <Link href={"/contact"}>Contact</Link>
          <Link href={"/newabout"}>About</Link>
        </div>
        {pathname == "/stock" && (
          <ContainersNav showExtraComponents={showExtraComponents} />
        )}
      </StyledNav>
    </StyledHeader>
  );
}
