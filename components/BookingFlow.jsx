"use client";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 40px 24px 80px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: "Inter";
  font-size: 0.8rem;
  color: rgba(255, 253, 237, 0.4);
  margin-bottom: 32px;
  transition: color 0.2s;

  &:hover {
    color: #fffded;
  }
`;

const PageTitle = styled.h1`
  font-family: "TrajanPro-Regular";
  font-size: 2rem;
  letter-spacing: 0.06em;
  margin-bottom: 40px;
  text-align: center;
`;

// ─── PROGRESS BAR ────────────────────────────
const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 48px;
`;

const ProgressStep = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StepDot = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter";
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.3s;
  border: 1.5px solid
    ${({ active, completed }) =>
      completed
        ? "rgba(34, 197, 94, 0.5)"
        : active
        ? "rgba(255, 253, 237, 0.5)"
        : "rgba(255, 255, 255, 0.1)"};
  background: ${({ active, completed }) =>
    completed
      ? "rgba(34, 197, 94, 0.15)"
      : active
      ? "rgba(255, 253, 237, 0.08)"
      : "transparent"};
  color: ${({ active, completed }) =>
    completed
      ? "#4ade80"
      : active
      ? "#fffded"
      : "rgba(255, 253, 237, 0.3)"};
`;

const StepLine = styled.div`
  width: 32px;
  height: 1px;
  background: ${({ completed }) =>
    completed ? "rgba(34, 197, 94, 0.3)" : "rgba(255, 255, 255, 0.08)"};

  @media (max-width: 480px) {
    width: 16px;
  }
`;

const StepLabel = styled.span`
  font-family: "Inter";
  font-size: 0.65rem;
  color: ${({ active }) =>
    active ? "rgba(255, 253, 237, 0.7)" : "rgba(255, 253, 237, 0.25)"};
  letter-spacing: 0.05em;
  display: none;

  @media (min-width: 640px) {
    display: block;
  }
`;

// ─── STEP CONTENT ────────────────────────────
const StepContent = styled.div`
  opacity: 0;
  transform: translateY(12px);
`;

const SectionTitle = styled.h3`
  font-family: "TrajanPro-Regular";
  font-size: 1.2rem;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: ${({ cols }) => `repeat(${cols || 2}, 1fr)`};
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  grid-column: ${({ span }) => (span ? `span ${span}` : "auto")};

  label {
    font-family: "Inter";
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 253, 237, 0.4);
  }

  input,
  select,
  textarea {
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    color: #fffded;
    font-family: "Inter";
    font-size: 0.85rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: rgba(255, 253, 237, 0.3);
    }

    &::placeholder {
      color: rgba(255, 253, 237, 0.25);
    }

    option {
      background: #111;
      color: #fffded;
    }
  }

  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

// ─── EXTRAS ──────────────────────────────────
const ExtrasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ExtraCard = styled.button`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  border-radius: 10px;
  border: 1px solid
    ${({ selected }) =>
      selected ? "rgba(255, 253, 237, 0.3)" : "rgba(255, 255, 255, 0.08)"};
  background: ${({ selected }) =>
    selected ? "rgba(255, 253, 237, 0.06)" : "rgba(255, 255, 255, 0.02)"};
  transition: all 0.25s;
  text-align: left;

  &:hover {
    border-color: rgba(255, 253, 237, 0.2);
  }
`;

const ExtraCheck = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 5px;
  border: 1.5px solid
    ${({ checked }) =>
      checked ? "#4ade80" : "rgba(255, 255, 255, 0.2)"};
  background: ${({ checked }) =>
    checked ? "rgba(34, 197, 94, 0.15)" : "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #4ade80;
  font-size: 0.7rem;
`;

const ExtraInfo = styled.div`
  flex: 1;

  .name {
    font-family: "Inter";
    font-size: 0.85rem;
    color: #fffded;
    margin-bottom: 2px;
  }

  .price {
    font-family: "Inter";
    font-size: 0.72rem;
    color: rgba(255, 253, 237, 0.4);
  }
`;

// ─── VEHICLE SUMMARY ─────────────────────────
const VehicleSummary = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  margin-bottom: 24px;
  align-items: center;

  img {
    width: 120px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  }

  .info {
    flex: 1;

    h4 {
      font-family: "TrajanPro-Regular";
      font-size: 1rem;
      margin-bottom: 4px;
    }

    p {
      font-family: "Inter";
      font-size: 0.75rem;
      color: rgba(255, 253, 237, 0.4);
    }
  }
`;

// ─── REVIEW SUMMARY ──────────────────────────
const SummaryCard = styled.div`
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
  margin-bottom: 24px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-family: "Inter";

  &:last-child {
    border-bottom: none;
  }

  .label {
    font-size: 0.8rem;
    color: rgba(255, 253, 237, 0.5);
  }

  .value {
    font-size: 0.85rem;
    color: #fffded;
  }

  &.total {
    background: rgba(255, 253, 237, 0.04);
    .label,
    .value {
      font-weight: 600;
      font-size: 0.95rem;
      color: #fffded;
    }
  }
`;

// ─── BUTTONS ─────────────────────────────────
const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 32px;
`;

const NavButton = styled.button`
  padding: 14px 32px;
  border-radius: 8px;
  font-family: "Inter";
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  transition: all 0.3s;
  min-width: 140px;

  ${({ variant }) =>
    variant === "primary"
      ? `
    background: #fffded;
    color: #000;
    border: none;
    &:hover { background: #fff; }
    &:disabled { opacity: 0.4; pointer-events: none; }
  `
      : `
    background: transparent;
    color: rgba(255,253,237,0.6);
    border: 1px solid rgba(255,255,255,0.12);
    &:hover { border-color: rgba(255,253,237,0.3); color: #fffded; }
  `}
`;

// ─── CONFIRMATION ────────────────────────────
const ConfirmationCard = styled.div`
  text-align: center;
  padding: 60px 24px;

  .check {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    border: 2px solid rgba(34, 197, 94, 0.4);
    background: rgba(34, 197, 94, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    font-size: 2rem;
    color: #4ade80;
  }

  h2 {
    font-family: "TrajanPro-Regular";
    font-size: 1.6rem;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
  }

  .booking-num {
    font-family: "Inter";
    font-size: 1.1rem;
    color: rgba(255, 253, 237, 0.6);
    margin-bottom: 8px;
  }

  .message {
    font-family: "Inter";
    font-size: 0.85rem;
    color: rgba(255, 253, 237, 0.4);
    max-width: 400px;
    margin: 0 auto 32px;
    line-height: 1.7;
  }
`;

const ErrorMsg = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #f87171;
  font-family: "Inter";
  font-size: 0.82rem;
  margin-bottom: 16px;
`;

// ═══════════════════════════════════════════
// EXTRAS CATALOG
// ═══════════════════════════════════════════
const EXTRAS_CATALOG = [
  { name: "GPS Navigation", price: 3 },
  { name: "Child Safety Seat", price: 5 },
  { name: "Full Insurance Cover", price: 10 },
  { name: "Additional Driver", price: 5 },
  { name: "Roadside Assistance", price: 4 },
  { name: "WiFi Hotspot", price: 3 },
];

// ═══════════════════════════════════════════
// STEP LABELS
// ═══════════════════════════════════════════
const STEPS = ["Dates", "Vehicle", "Extras", "Info", "Review"];

// ═══════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════

export default function BookingFlow({ dealership }) {
  const searchParams = useSearchParams();
  const stepRef = useRef(null);

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState(null);

  // ─── FORM STATE ─────────────────────────────
  const [pickupDate, setPickupDate] = useState(searchParams.get("pickup") || "");
  const [returnDate, setReturnDate] = useState(searchParams.get("return") || "");
  const [pickupLocation, setPickupLocation] = useState("");
  const [returnLocation, setReturnLocation] = useState("");

  const [selectedCarId, setSelectedCarId] = useState(searchParams.get("car") || "");
  const [selectedCar, setSelectedCar] = useState(null);
  const [availableCars, setAvailableCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);

  const [selectedExtras, setSelectedExtras] = useState([]);

  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    driverLicenseNumber: "",
    notes: "",
  });

  const currency = dealership?.rentalConfig?.currency || "JOD";

  // Animate step transitions
  useGSAP(
    () => {
      if (stepRef.current) {
        gsap.fromTo(
          stepRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    },
    { dependencies: [step] }
  );

  // Load car details if pre-selected
  useEffect(() => {
    if (selectedCarId && !selectedCar) {
      fetch(`/api/fleet/${selectedCarId}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.vehicle) setSelectedCar(data.vehicle);
        })
        .catch(() => {});
    }
  }, [selectedCarId]);

  // Load available cars for step 2 if no car pre-selected
  useEffect(() => {
    if (step === 1 && !selectedCarId && pickupDate && returnDate) {
      setLoadingCars(true);
      fetch(
        `/api/fleet?dealershipId=${dealership?._id}&status=available&limit=50`
      )
        .then((r) => r.json())
        .then((data) => {
          setAvailableCars(data.fleet || []);
        })
        .catch(() => {})
        .finally(() => setLoadingCars(false));
    }
  }, [step, dealership]);

  const toggleExtra = (extra) => {
    setSelectedExtras((prev) => {
      const exists = prev.find((e) => e.name === extra.name);
      if (exists) return prev.filter((e) => e.name !== extra.name);
      return [...prev, extra];
    });
  };

  // Compute pricing
  const totalDays = (() => {
    if (!pickupDate || !returnDate) return 0;
    const diff = new Date(returnDate) - new Date(pickupDate);
    return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  })();

  const dailyRate = selectedCar?.dailyRate || 0;
  const subtotal = dailyRate * totalDays;
  const extrasTotal = selectedExtras.reduce((s, e) => s + e.price * totalDays, 0);
  const totalAmount = subtotal + extrasTotal;
  const deposit = Math.round(totalAmount * ((dealership?.rentalConfig?.depositPercent || 20) / 100));

  const canProceed = () => {
    switch (step) {
      case 0:
        return pickupDate && returnDate && new Date(returnDate) > new Date(pickupDate);
      case 1:
        return !!selectedCar;
      case 2:
        return true; // extras are optional
      case 3:
        return contactInfo.firstName && contactInfo.phone;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const goNext = () => {
    if (step === 1 && selectedCarId && selectedCar) {
      // Skip car selection if pre-selected
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    setError("");
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    setError("");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dealershipId: dealership?._id,
          fleetId: selectedCar._id,
          pickupDate,
          returnDate,
          rateType: "daily",
          extras: selectedExtras,
          firstName: contactInfo.firstName,
          lastName: contactInfo.lastName,
          email: contactInfo.email,
          phone: contactInfo.phone,
          driverLicenseNumber: contactInfo.driverLicenseNumber,
          pickupLocation,
          returnLocation: returnLocation || pickupLocation,
          notes: contactInfo.notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create booking.");
        return;
      }

      setConfirmation(data.booking);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  // ─── CONFIRMATION SCREEN ────────────────────
  if (confirmation) {
    return (
      <Wrapper>
        <Container>
          <ConfirmationCard>
            <div className="check">✓</div>
            <h2>Booking Confirmed</h2>
            <p className="booking-num">#{confirmation.bookingNumber}</p>
            <p className="message">
              Your reservation has been received. Please pay at pickup. 
              We'll contact you to confirm your booking details.
            </p>
            <SummaryCard>
              <SummaryRow>
                <span className="label">Vehicle</span>
                <span className="value">{confirmation.vehicle?.title}</span>
              </SummaryRow>
              <SummaryRow>
                <span className="label">Dates</span>
                <span className="value">
                  {new Date(confirmation.pickupDate).toLocaleDateString()} →{" "}
                  {new Date(confirmation.returnDate).toLocaleDateString()}
                </span>
              </SummaryRow>
              <SummaryRow>
                <span className="label">Duration</span>
                <span className="value">{confirmation.totalDays} days</span>
              </SummaryRow>
              <SummaryRow className="total">
                <span className="label">Total</span>
                <span className="value">
                  {confirmation.totalAmount} {currency}
                </span>
              </SummaryRow>
            </SummaryCard>
            <NavButton
              variant="primary"
              onClick={() => (window.location.href = "/")}
              style={{ width: "100%" }}
            >
              Back to Home
            </NavButton>
          </ConfirmationCard>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <BackLink href={selectedCarId ? `/stock/${selectedCarId}` : "/stock"}>
          ← Back
        </BackLink>

        <PageTitle>Reserve Your Vehicle</PageTitle>

        {/* Progress */}
        <ProgressBar>
          {STEPS.map((label, i) => (
            <ProgressStep key={label}>
              {i > 0 && <StepLine completed={i <= step} />}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                <StepDot active={i === step} completed={i < step}>
                  {i < step ? "✓" : i + 1}
                </StepDot>
                <StepLabel active={i === step}>{label}</StepLabel>
              </div>
            </ProgressStep>
          ))}
        </ProgressBar>

        {error && <ErrorMsg>{error}</ErrorMsg>}

        {/* ═══ STEP 0: DATES ═══ */}
        {step === 0 && (
          <StepContent ref={stepRef} key="dates">
            <SectionTitle>Select Your Dates</SectionTitle>
            <FormGrid cols={2}>
              <Field>
                <label>Pick-up Date *</label>
                <input
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={today}
                />
              </Field>
              <Field>
                <label>Return Date *</label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={pickupDate || today}
                />
              </Field>
              <Field>
                <label>Pick-up Location</label>
                <input
                  type="text"
                  placeholder="Office / Airport / Custom"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />
              </Field>
              <Field>
                <label>Return Location</label>
                <input
                  type="text"
                  placeholder="Same as pick-up"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                />
              </Field>
            </FormGrid>
            {totalDays > 0 && (
              <p
                style={{
                  fontFamily: "Inter",
                  fontSize: "0.8rem",
                  color: "rgba(255,253,237,0.4)",
                }}
              >
                Duration: {totalDays} day{totalDays > 1 ? "s" : ""}
              </p>
            )}
          </StepContent>
        )}

        {/* ═══ STEP 1: VEHICLE ═══ */}
        {step === 1 && (
          <StepContent ref={stepRef} key="vehicle">
            <SectionTitle>Choose Your Vehicle</SectionTitle>

            {selectedCar ? (
              <>
                <VehicleSummary>
                  {selectedCar.images?.[0] && (
                    <img src={selectedCar.images[0]} alt={selectedCar.title} />
                  )}
                  <div className="info">
                    <h4>{selectedCar.title}</h4>
                    <p>
                      {selectedCar.transmission} • {selectedCar.fuel} •{" "}
                      {selectedCar.seats} Seats
                    </p>
                    <p style={{ marginTop: "4px", color: "#fffded" }}>
                      {selectedCar.dailyRate} {currency} / day
                    </p>
                  </div>
                </VehicleSummary>
                {!searchParams.get("car") && (
                  <NavButton
                    variant="secondary"
                    onClick={() => {
                      setSelectedCar(null);
                      setSelectedCarId("");
                    }}
                    style={{ marginBottom: "16px" }}
                  >
                    Choose Different Vehicle
                  </NavButton>
                )}
              </>
            ) : loadingCars ? (
              <p
                style={{
                  fontFamily: "Inter",
                  color: "rgba(255,253,237,0.4)",
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                Loading available vehicles…
              </p>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {availableCars.map((car) => (
                  <ExtraCard
                    key={car._id}
                    selected={selectedCarId === car._id}
                    onClick={() => {
                      setSelectedCarId(car._id);
                      setSelectedCar(car);
                    }}
                    style={{ flexDirection: "column", alignItems: "stretch" }}
                  >
                    {car.images?.[0] && (
                      <img
                        src={car.images[0]}
                        alt={car.title}
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "6px",
                          marginBottom: "8px",
                        }}
                      />
                    )}
                    <div style={{ fontFamily: "Inter", fontSize: "0.85rem", color: "#fffded" }}>
                      {car.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Inter",
                        fontSize: "0.72rem",
                        color: "rgba(255,253,237,0.4)",
                      }}
                    >
                      {car.dailyRate} {currency} / day
                    </div>
                  </ExtraCard>
                ))}
                {availableCars.length === 0 && (
                  <p
                    style={{
                      gridColumn: "1 / -1",
                      fontFamily: "Inter",
                      color: "rgba(255,253,237,0.4)",
                      textAlign: "center",
                      padding: "40px",
                    }}
                  >
                    No vehicles available. Try different dates.
                  </p>
                )}
              </div>
            )}
          </StepContent>
        )}

        {/* ═══ STEP 2: EXTRAS ═══ */}
        {step === 2 && (
          <StepContent ref={stepRef} key="extras">
            <SectionTitle>Optional Extras</SectionTitle>
            <p
              style={{
                fontFamily: "Inter",
                fontSize: "0.8rem",
                color: "rgba(255,253,237,0.4)",
                marginBottom: "20px",
              }}
            >
              Enhance your rental experience with add-ons. Prices are per day.
            </p>
            <ExtrasGrid>
              {EXTRAS_CATALOG.map((extra) => {
                const isSelected = selectedExtras.some(
                  (e) => e.name === extra.name
                );
                return (
                  <ExtraCard
                    key={extra.name}
                    selected={isSelected}
                    onClick={() => toggleExtra(extra)}
                  >
                    <ExtraCheck checked={isSelected}>
                      {isSelected && "✓"}
                    </ExtraCheck>
                    <ExtraInfo>
                      <div className="name">{extra.name}</div>
                      <div className="price">
                        +{extra.price} {currency} / day
                      </div>
                    </ExtraInfo>
                  </ExtraCard>
                );
              })}
            </ExtrasGrid>
          </StepContent>
        )}

        {/* ═══ STEP 3: INFO ═══ */}
        {step === 3 && (
          <StepContent ref={stepRef} key="info">
            <SectionTitle>Your Information</SectionTitle>
            <FormGrid cols={2}>
              <Field>
                <label>First Name *</label>
                <input
                  type="text"
                  value={contactInfo.firstName}
                  onChange={(e) =>
                    setContactInfo((s) => ({ ...s, firstName: e.target.value }))
                  }
                  placeholder="John"
                />
              </Field>
              <Field>
                <label>Last Name</label>
                <input
                  type="text"
                  value={contactInfo.lastName}
                  onChange={(e) =>
                    setContactInfo((s) => ({ ...s, lastName: e.target.value }))
                  }
                  placeholder="Doe"
                />
              </Field>
              <Field>
                <label>Phone Number *</label>
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo((s) => ({ ...s, phone: e.target.value }))
                  }
                  placeholder="+962 7XX XXX XXXX"
                />
              </Field>
              <Field>
                <label>Email</label>
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo((s) => ({ ...s, email: e.target.value }))
                  }
                  placeholder="john@example.com"
                />
              </Field>
              <Field span={2}>
                <label>Driver's License Number</label>
                <input
                  type="text"
                  value={contactInfo.driverLicenseNumber}
                  onChange={(e) =>
                    setContactInfo((s) => ({
                      ...s,
                      driverLicenseNumber: e.target.value,
                    }))
                  }
                  placeholder="License number"
                />
              </Field>
              <Field span={2}>
                <label>Notes</label>
                <textarea
                  value={contactInfo.notes}
                  onChange={(e) =>
                    setContactInfo((s) => ({ ...s, notes: e.target.value }))
                  }
                  placeholder="Any special requests or notes…"
                />
              </Field>
            </FormGrid>
          </StepContent>
        )}

        {/* ═══ STEP 4: REVIEW ═══ */}
        {step === 4 && (
          <StepContent ref={stepRef} key="review">
            <SectionTitle>Review Your Booking</SectionTitle>

            {selectedCar && (
              <VehicleSummary>
                {selectedCar.images?.[0] && (
                  <img src={selectedCar.images[0]} alt={selectedCar.title} />
                )}
                <div className="info">
                  <h4>{selectedCar.title}</h4>
                  <p>
                    {selectedCar.transmission} • {selectedCar.fuel} •{" "}
                    {selectedCar.seats} Seats
                  </p>
                </div>
              </VehicleSummary>
            )}

            <SummaryCard>
              <SummaryRow>
                <span className="label">Pick-up</span>
                <span className="value">
                  {new Date(pickupDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </SummaryRow>
              <SummaryRow>
                <span className="label">Return</span>
                <span className="value">
                  {new Date(returnDate).toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </SummaryRow>
              {pickupLocation && (
                <SummaryRow>
                  <span className="label">Location</span>
                  <span className="value">{pickupLocation}</span>
                </SummaryRow>
              )}
              <SummaryRow>
                <span className="label">Duration</span>
                <span className="value">
                  {totalDays} day{totalDays > 1 ? "s" : ""}
                </span>
              </SummaryRow>
              <SummaryRow>
                <span className="label">
                  Daily Rate × {totalDays}
                </span>
                <span className="value">
                  {subtotal} {currency}
                </span>
              </SummaryRow>
              {selectedExtras.length > 0 && (
                <>
                  {selectedExtras.map((e) => (
                    <SummaryRow key={e.name}>
                      <span className="label">
                        {e.name} × {totalDays}
                      </span>
                      <span className="value">
                        {e.price * totalDays} {currency}
                      </span>
                    </SummaryRow>
                  ))}
                </>
              )}
              <SummaryRow className="total">
                <span className="label">Total</span>
                <span className="value">
                  {totalAmount} {currency}
                </span>
              </SummaryRow>
              <SummaryRow>
                <span className="label">
                  Deposit ({dealership?.rentalConfig?.depositPercent || 20}%)
                </span>
                <span className="value">
                  {deposit} {currency}
                </span>
              </SummaryRow>
            </SummaryCard>

            <div
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                background: "rgba(255, 253, 237, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                fontFamily: "Inter",
                fontSize: "0.78rem",
                color: "rgba(255,253,237,0.4)",
                lineHeight: "1.6",
                marginBottom: "8px",
              }}
            >
              💳 <strong style={{ color: "rgba(255,253,237,0.6)" }}>Pay at Pickup</strong> — No payment
              is required online. Full payment including deposit will be
              collected when you pick up the vehicle.
            </div>
          </StepContent>
        )}

        {/* Navigation */}
        <ButtonRow>
          {step > 0 ? (
            <NavButton variant="secondary" onClick={goBack}>
              ← Back
            </NavButton>
          ) : (
            <div />
          )}
          {step < STEPS.length - 1 ? (
            <NavButton
              variant="primary"
              onClick={goNext}
              disabled={!canProceed()}
            >
              Continue →
            </NavButton>
          ) : (
            <NavButton
              variant="primary"
              onClick={handleSubmit}
              disabled={submitting || !canProceed()}
            >
              {submitting ? "Submitting…" : "Confirm Booking"}
            </NavButton>
          )}
        </ButtonRow>
      </Container>
    </Wrapper>
  );
}
