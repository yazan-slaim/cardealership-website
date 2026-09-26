"use client";
import { useState, useRef } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css/core";

gsap.registerPlugin(useGSAP);

// ═══════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: black;
  color: #fffded;
  padding-top: 140px;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  padding: 40px 60px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 20px;
  }
`;

// ─── GALLERY ─────────────────────────────────
const GallerySection = styled.div`
  border-radius: 14px;
  overflow: hidden;
  opacity: 0;

  .splide__track {
    border-radius: 14px;
  }

  .splide__pagination__page {
    background: rgba(255, 253, 237, 0.3);

    &.is-active {
      background: #fffded;
    }
  }
`;

const SlideImage = styled.img`
  width: 100%;
  height: 480px;
  object-fit: cover;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  font-family: "Inter";
  font-size: 0.9rem;
  color: rgba(255, 253, 237, 0.15);

  @media (max-width: 768px) {
    height: 300px;
  }
`;

// ─── DETAILS ─────────────────────────────────
const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  opacity: 0;
`;

const TitleBlock = styled.div`
  h1 {
    font-family: "TrajanPro-Regular";
    font-size: 2.2rem;
    letter-spacing: 0.05em;
    margin-bottom: 8px;

    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }
`;

const TagRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const Tag = styled.span`
  padding: 5px 14px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: "Inter";
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: rgba(255, 253, 237, 0.6);
`;

// ─── PRICING TABLE ───────────────────────────
const PricingCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 28px;
`;

const PricingTitle = styled.h3`
  font-family: "TrajanPro-Regular";
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 253, 237, 0.5);
  margin-bottom: 20px;
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const PriceBox = styled.div`
  text-align: center;
  padding: 18px 12px;
  border-radius: 10px;
  border: 1px solid
    ${({ highlight }) =>
      highlight ? "rgba(255, 253, 237, 0.25)" : "rgba(255, 255, 255, 0.06)"};
  background: ${({ highlight }) =>
    highlight ? "rgba(255, 253, 237, 0.05)" : "transparent"};
  transition: all 0.3s;

  &:hover {
    border-color: rgba(255, 253, 237, 0.2);
  }

  .label {
    font-family: "Inter";
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255, 253, 237, 0.4);
    margin-bottom: 8px;
  }

  .price {
    font-family: "TrajanPro-Regular";
    font-size: 1.5rem;
    color: #fffded;
  }

  .currency {
    font-family: "Inter";
    font-size: 0.7rem;
    color: rgba(255, 253, 237, 0.35);
    margin-top: 4px;
  }
`;

// ─── SPECS ───────────────────────────────────
const SpecsCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 28px;
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
`;

const SpecItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);

  &:nth-last-of-type(-n + 2) {
    border-bottom: none;
  }

  &:nth-of-type(odd) {
    padding-right: 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.04);
  }

  &:nth-of-type(even) {
    padding-left: 20px;
  }

  .label {
    font-family: "Inter";
    font-size: 0.75rem;
    color: rgba(255, 253, 237, 0.4);
  }

  .value {
    font-family: "Inter";
    font-size: 0.82rem;
    color: #fffded;
  }
`;

// ─── FEATURES ────────────────────────────────
const FeaturesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const FeatureTag = styled.span`
  padding: 6px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  font-family: "Inter";
  font-size: 0.75rem;
  color: rgba(255, 253, 237, 0.6);
`;

// ─── AVAILABILITY ────────────────────────────
const AvailabilityCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 28px;
`;

const DateInputRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const DateField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-family: "Inter";
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 253, 237, 0.4);
  }

  input {
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #fffded;
    font-family: "Inter";
    font-size: 0.85rem;
    outline: none;

    &:focus {
      border-color: rgba(255, 253, 237, 0.3);
    }
  }
`;

const CheckButton = styled.button`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: 1px solid rgba(255, 253, 237, 0.2);
  background: transparent;
  color: #fffded;
  font-family: "Inter";
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 253, 237, 0.06);
    border-color: rgba(255, 253, 237, 0.4);
  }

  &:disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

const AvailabilityResult = styled.div`
  margin-top: 16px;
  padding: 14px;
  border-radius: 8px;
  font-family: "Inter";
  font-size: 0.85rem;
  text-align: center;
  background: ${({ available }) =>
    available ? "rgba(34, 197, 94, 0.08)" : "rgba(239, 68, 68, 0.08)"};
  border: 1px solid
    ${({ available }) =>
      available ? "rgba(34, 197, 94, 0.2)" : "rgba(239, 68, 68, 0.2)"};
  color: ${({ available }) => (available ? "#4ade80" : "#f87171")};
`;

const BookNowButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 16px;
  border-radius: 10px;
  background: #fffded;
  color: #000;
  font-family: "TrajanPro-Regular";
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-align: center;
  text-transform: uppercase;
  transition: all 0.3s ease;
  margin-top: 12px;

  &:hover {
    background: #fff;
    transform: scale(1.01);
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 60px 0;
  font-family: "Inter";
  font-size: 0.8rem;
  color: rgba(255, 253, 237, 0.4);
  transition: color 0.2s;

  &:hover {
    color: #fffded;
  }

  @media (max-width: 1024px) {
    padding: 0 20px;
  }
`;

// ═══════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════

export default function RentalCarDetail({ product, dealership }) {
  const galleryRef = useRef(null);
  const detailsRef = useRef(null);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [availability, setAvailability] = useState(null);
  const [checking, setChecking] = useState(false);

  const currency = dealership?.rentalConfig?.currency || "JOD";

  useGSAP(() => {
    gsap.to(galleryRef.current, {
      opacity: 1,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
    });
    gsap.to(detailsRef.current, {
      opacity: 1,
      duration: 0.8,
      delay: 0.4,
      ease: "power2.out",
    });
  });

  if (!product) {
    return (
      <Wrapper>
        <ContentGrid>
          <div
            style={{
              padding: "100px 0",
              textAlign: "center",
              fontFamily: "Inter",
              color: "rgba(255,253,237,0.4)",
              gridColumn: "1 / -1",
            }}
          >
            Vehicle not found.
          </div>
        </ContentGrid>
      </Wrapper>
    );
  }

  const checkAvailability = async () => {
    if (!pickupDate || !returnDate) return;
    setChecking(true);
    setAvailability(null);

    try {
      const res = await fetch(
        `/api/fleet/availability?fleetId=${product._id}&pickupDate=${pickupDate}&returnDate=${returnDate}`
      );
      const data = await res.json();
      setAvailability(data);
    } catch {
      setAvailability({ available: false, reason: "Failed to check availability." });
    } finally {
      setChecking(false);
    }
  };

  const title =
    product.title || `${product.year} ${product.carMake} ${product.model}`;
  const today = new Date().toISOString().split("T")[0];

  const specs = [
    { label: "Body Type", value: product.bodyType },
    { label: "Fuel", value: product.fuel },
    { label: "Transmission", value: product.transmission },
    { label: "Seats", value: product.seats },
    { label: "Year", value: product.year },
    { label: "Color", value: product.color },
    { label: "Engine", value: product.engineSize ? `${product.engineSize}L` : null },
    { label: "Mileage", value: product.mileage ? `${product.mileage.toLocaleString()} km` : null },
  ].filter((s) => s.value);

  const bookingParams = new URLSearchParams();
  bookingParams.set("car", product._id);
  if (pickupDate) bookingParams.set("pickup", pickupDate);
  if (returnDate) bookingParams.set("return", returnDate);

  return (
    <Wrapper>
      <BackLink href="/stock">← Back to Fleet</BackLink>

      <ContentGrid>
        {/* ═══ GALLERY ═══ */}
        <GallerySection ref={galleryRef}>
          {product.images?.length > 0 ? (
            <Splide
              options={{
                type: "loop",
                perPage: 1,
                pagination: true,
                arrows: true,
                autoplay: true,
                interval: 5000,
                pauseOnHover: true,
              }}
            >
              {product.images.map((img, idx) => (
                <SplideSlide key={idx}>
                  <SlideImage src={img} alt={`${title} - ${idx + 1}`} />
                </SplideSlide>
              ))}
            </Splide>
          ) : (
            <NoImage>No images available</NoImage>
          )}
        </GallerySection>

        {/* ═══ DETAILS ═══ */}
        <DetailsSection ref={detailsRef}>
          <TitleBlock>
            <h1>{title}</h1>
            <TagRow>
              {product.bodyType && <Tag>{product.bodyType}</Tag>}
              {product.fuel && <Tag>{product.fuel}</Tag>}
              {product.transmission && <Tag>{product.transmission}</Tag>}
              <Tag>{product.seats || 5} Seats</Tag>
            </TagRow>
          </TitleBlock>

          {/* Pricing */}
          <PricingCard>
            <PricingTitle>Rental Rates</PricingTitle>
            <PricingGrid>
              <PriceBox highlight>
                <div className="label">Daily</div>
                <div className="price">{product.dailyRate}</div>
                <div className="currency">{currency} / day</div>
              </PriceBox>
              {product.weeklyRate && (
                <PriceBox>
                  <div className="label">Weekly</div>
                  <div className="price">{product.weeklyRate}</div>
                  <div className="currency">{currency} / week</div>
                </PriceBox>
              )}
              {product.monthlyRate && (
                <PriceBox>
                  <div className="label">Monthly</div>
                  <div className="price">{product.monthlyRate}</div>
                  <div className="currency">{currency} / month</div>
                </PriceBox>
              )}
            </PricingGrid>
          </PricingCard>

          {/* Specs */}
          <SpecsCard>
            <PricingTitle>Specifications</PricingTitle>
            <SpecsGrid>
              {specs.map((s) => (
                <SpecItem key={s.label}>
                  <span className="label">{s.label}</span>
                  <span className="value">{s.value}</span>
                </SpecItem>
              ))}
            </SpecsGrid>
          </SpecsCard>

          {/* Features */}
          {product.features?.length > 0 && (
            <SpecsCard>
              <PricingTitle>Features & Equipment</PricingTitle>
              <FeaturesGrid>
                {product.features.map((f) => (
                  <FeatureTag key={f}>{f}</FeatureTag>
                ))}
              </FeaturesGrid>
            </SpecsCard>
          )}

          {/* Availability Checker */}
          <AvailabilityCard>
            <PricingTitle>Check Availability</PricingTitle>
            <DateInputRow>
              <DateField>
                <label>Pick-up Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                    setAvailability(null);
                  }}
                  min={today}
                />
              </DateField>
              <DateField>
                <label>Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => {
                    setReturnDate(e.target.value);
                    setAvailability(null);
                  }}
                  min={pickupDate || today}
                />
              </DateField>
            </DateInputRow>
            <CheckButton
              onClick={checkAvailability}
              disabled={!pickupDate || !returnDate || checking}
            >
              {checking ? "Checking…" : "Check Availability"}
            </CheckButton>

            {availability && (
              <AvailabilityResult available={availability.available}>
                {availability.available
                  ? "✓ Available for your selected dates!"
                  : availability.reason || "✕ Not available for these dates."}
              </AvailabilityResult>
            )}

            {availability?.available && (
              <BookNowButton href={`/book?${bookingParams.toString()}`}>
                Book Now
              </BookNowButton>
            )}
          </AvailabilityCard>
        </DetailsSection>
      </ContentGrid>
    </Wrapper>
  );
}
