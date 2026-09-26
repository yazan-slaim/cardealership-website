"use client";
import { useRef, useEffect, useState } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

gsap.registerPlugin(useGSAP);

// ═══════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: black;
`;

// ─── HERO ────────────────────────────────────
const HeroSection = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: black;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.1) 40%,
      rgba(0, 0, 0, 0.6) 80%,
      rgba(0, 0, 0, 0.95) 100%
    );
  }

  video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    opacity: 0;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  font-family: "TrajanPro-Regular";
  text-align: center;
  gap: 20px;
  padding: 0 20px;

  h2 {
    font-size: 0.95rem;
    font-family: "Inter";
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: rgba(255, 253, 237, 0.7);
    opacity: 0;
  }

  h1 {
    font-size: 3.8rem;
    letter-spacing: 0.08em;
    color: #fffded;
    line-height: 1.1;
    opacity: 0;

    @media (max-width: 768px) {
      font-size: 2.4rem;
    }
  }
`;

const HeroSearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 60px;
  padding: 8px 12px;
  margin-top: 20px;
  opacity: 0;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    border-radius: 20px;
    width: 90%;
    padding: 16px;
  }
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 20px;

  label {
    font-family: "Inter";
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: rgba(255, 253, 237, 0.5);
  }

  input,
  select {
    background: transparent;
    border: none;
    color: #fffded;
    font-family: "Inter";
    font-size: 0.9rem;
    outline: none;
    min-width: 140px;

    &::placeholder {
      color: rgba(255, 253, 237, 0.35);
    }

    option {
      background: #111;
      color: #fffded;
    }
  }

  @media (max-width: 768px) {
    padding: 8px 0;
    width: 100%;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);

    &:last-of-type {
      border-bottom: none;
    }
  }
`;

const SearchDivider = styled.div`
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchButton = styled.button`
  background: #fffded;
  color: #000;
  border: none;
  border-radius: 50px;
  padding: 14px 32px;
  font-family: "Inter";
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: #fff;
    transform: scale(1.03);
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 8px;
  }
`;

// ─── HOW IT WORKS ────────────────────────────
const HowItWorksSection = styled.section`
  padding: 120px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  background: black;

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const SectionTitle = styled.h2`
  font-family: "TrajanPro-Regular";
  font-size: 2.2rem;
  letter-spacing: 0.08em;
  color: #fffded;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  width: 100%;
  max-width: 1000px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const StepCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
  padding: 40px 24px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.02);
  transition: all 0.4s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.12);
    transform: translateY(-4px);
  }
`;

const StepNumber = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px solid rgba(255, 253, 237, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "TrajanPro-Regular";
  font-size: 1.2rem;
  color: #fffded;
`;

const StepTitle = styled.h3`
  font-family: "TrajanPro-Regular";
  font-size: 1.1rem;
  color: #fffded;
  letter-spacing: 0.05em;
`;

const StepDesc = styled.p`
  font-family: "Inter";
  font-size: 0.85rem;
  color: rgba(255, 253, 237, 0.55);
  line-height: 1.7;
`;

// ─── FEATURED FLEET ──────────────────────────
const FeaturedSection = styled.section`
  padding: 100px 0 120px;
  background: black;
`;

const FeaturedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  margin-bottom: 48px;

  @media (max-width: 768px) {
    padding: 0 24px;
    flex-direction: column;
    gap: 16px;
  }
`;

const ViewAllLink = styled(Link)`
  font-family: "Inter";
  font-size: 0.85rem;
  color: rgba(255, 253, 237, 0.6);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 0.3s;
  border-bottom: 1px solid rgba(255, 253, 237, 0.2);
  padding-bottom: 2px;

  &:hover {
    color: #fffded;
    border-color: #fffded;
  }
`;

const FleetScroller = styled.div`
  display: flex;
  gap: 20px;
  padding: 0 60px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0 24px;
  }
`;

const FleetCard = styled.div`
  flex: 0 0 380px;
  scroll-snap-align: start;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.4s ease;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-6px);

    img {
      transform: scale(1.05);
    }
  }

  @media (max-width: 768px) {
    flex: 0 0 85vw;
  }
`;

const CardImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
`;

const CardBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  padding: 6px 14px;
  border-radius: 20px;
  font-family: "Inter";
  font-size: 0.7rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #fffded;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const CardBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CardTitle = styled.h3`
  font-family: "TrajanPro-Regular";
  font-size: 1.05rem;
  color: #fffded;
  letter-spacing: 0.03em;
`;

const CardSpecs = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  span {
    font-family: "Inter";
    font-size: 0.75rem;
    color: rgba(255, 253, 237, 0.45);
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

const CardPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);

  span.amount {
    font-family: "TrajanPro-Regular";
    font-size: 1.3rem;
    color: #fffded;
  }

  span.period {
    font-family: "Inter";
    font-size: 0.75rem;
    color: rgba(255, 253, 237, 0.4);
  }
`;

// ─── CTA ─────────────────────────────────────
const CTASection = styled.section`
  padding: 100px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
  text-align: center;
  background: black;
  border-top: 1px solid rgba(255, 255, 255, 0.04);

  @media (max-width: 768px) {
    padding: 80px 24px;
  }
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 40px;
  background: transparent;
  color: #fffded;
  border: 1.5px solid rgba(255, 253, 237, 0.3);
  border-radius: 50px;
  font-family: "TrajanPro-Regular";
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 253, 237, 0.08);
    border-color: rgba(255, 253, 237, 0.5);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const CTASubtext = styled.p`
  font-family: "Inter";
  font-size: 0.85rem;
  color: rgba(255, 253, 237, 0.4);
  max-width: 500px;
  line-height: 1.7;
`;

// ═══════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════

export default function RentalHomePage({ featuredFleet = [], dealership }) {
  const heroRef = useRef(null);
  const [searchDates, setSearchDates] = useState({ pickup: "", return: "" });
  const [bodyType, setBodyType] = useState("");

  useGSAP(
    () => {
      gsap.to("video", {
        opacity: 1,
        duration: 3,
        delay: 0.3,
        ease: "power1.inOut",
      });

      gsap.fromTo(
        ".hero-subtitle",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.6, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-title",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.5, delay: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".hero-search",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 1.2, ease: "power2.out" }
      );
    },
    { scope: heroRef }
  );

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchDates.pickup) params.set("pickup", searchDates.pickup);
    if (searchDates.return) params.set("return", searchDates.return);
    if (bodyType) params.set("bodyType", bodyType);
    const query = params.toString();
    window.location.href = `/stock${query ? `?${query}` : ""}`;
  };

  const currency = dealership?.rentalConfig?.currency || "JOD";

  return (
    <Container>
      {/* ═══ HERO ═══ */}
      <HeroSection ref={heroRef}>
        <video autoPlay loop muted playsInline>
          <source src="/videos/videoplayback.webm" type="video/webm" />
        </video>
        <HeroContent>
          <h2 className="hero-subtitle">
            {dealership?.name || "Premium Car Rental"}
          </h2>
          <h1 className="hero-title">
            Drive Your
            <br />
            Dream Today
          </h1>

          <HeroSearchBox className="hero-search">
            <SearchField>
              <label>Pick-up Date</label>
              <input
                type="date"
                value={searchDates.pickup}
                onChange={(e) =>
                  setSearchDates((s) => ({ ...s, pickup: e.target.value }))
                }
                min={new Date().toISOString().split("T")[0]}
              />
            </SearchField>

            <SearchDivider />

            <SearchField>
              <label>Return Date</label>
              <input
                type="date"
                value={searchDates.return}
                onChange={(e) =>
                  setSearchDates((s) => ({ ...s, return: e.target.value }))
                }
                min={
                  searchDates.pickup ||
                  new Date().toISOString().split("T")[0]
                }
              />
            </SearchField>

            <SearchDivider />

            <SearchField>
              <label>Vehicle Type</label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Luxury">Luxury</option>
                <option value="Sports">Sports</option>
                <option value="Van">Van</option>
                <option value="Pickup">Pickup</option>
              </select>
            </SearchField>

            <SearchButton onClick={handleSearch}>Search</SearchButton>
          </HeroSearchBox>
        </HeroContent>
      </HeroSection>

      {/* ═══ HOW IT WORKS ═══ */}
      <HowItWorksSection>
        <SectionTitle>How It Works</SectionTitle>
        <StepsGrid>
          <StepCard>
            <StepNumber>01</StepNumber>
            <StepTitle>Search & Choose</StepTitle>
            <StepDesc>
              Browse our fleet of premium vehicles. Filter by type, price, and
              features to find your perfect match.
            </StepDesc>
          </StepCard>
          <StepCard>
            <StepNumber>02</StepNumber>
            <StepTitle>Reserve Online</StepTitle>
            <StepDesc>
              Select your dates, add optional extras, and complete your
              reservation in minutes — pay at pickup.
            </StepDesc>
          </StepCard>
          <StepCard>
            <StepNumber>03</StepNumber>
            <StepTitle>Drive Away</StepTitle>
            <StepDesc>
              Pick up your vehicle at the scheduled time. Your car will be
              cleaned, fueled, and ready to go.
            </StepDesc>
          </StepCard>
        </StepsGrid>
      </HowItWorksSection>

      {/* ═══ FEATURED FLEET ═══ */}
      {featuredFleet.length > 0 && (
        <FeaturedSection>
          <FeaturedHeader>
            <SectionTitle>Featured Fleet</SectionTitle>
            <ViewAllLink href="/stock">View All Vehicles →</ViewAllLink>
          </FeaturedHeader>

          <FleetScroller>
            {featuredFleet.map((car) => (
              <Link key={car._id} href={`/stock/${car._id}`} style={{ textDecoration: "none" }}>
                <FleetCard>
                  <CardImageWrap>
                    {car.images?.[0] ? (
                      <img src={car.images[0]} alt={car.title} loading="lazy" />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "rgba(255,255,255,0.05)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Inter",
                          color: "rgba(255,253,237,0.2)",
                        }}
                      >
                        No Image
                      </div>
                    )}
                    {car.bodyType && <CardBadge>{car.bodyType}</CardBadge>}
                  </CardImageWrap>
                  <CardBody>
                    <CardTitle>{car.title || `${car.year} ${car.carMake} ${car.model}`}</CardTitle>
                    <CardSpecs>
                      <span>{car.transmission || "Auto"}</span>
                      <span>•</span>
                      <span>{car.fuel || "Petrol"}</span>
                      <span>•</span>
                      <span>{car.seats || 5} Seats</span>
                    </CardSpecs>
                    <CardPrice>
                      <span className="amount">
                        {car.dailyRate} {currency}
                      </span>
                      <span className="period">/ day</span>
                    </CardPrice>
                  </CardBody>
                </FleetCard>
              </Link>
            ))}
          </FleetScroller>
        </FeaturedSection>
      )}

      {/* ═══ CTA ═══ */}
      <CTASection>
        <SectionTitle>Ready to Hit the Road?</SectionTitle>
        <CTASubtext>
          Browse our complete fleet of meticulously maintained vehicles. From
          economical daily drivers to luxury experiences — we have the perfect
          car for every journey.
        </CTASubtext>
        <CTAButton href="/stock">
          Browse Our Fleet
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </CTAButton>
      </CTASection>

      <div style={{ height: "10vh", width: "100vw" }} />
    </Container>
  );
}
