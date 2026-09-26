"use client";
import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// ═══════════════════════════════════════════
// STYLED COMPONENTS
// ═══════════════════════════════════════════

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  color: #fffded;
  background: black;
  padding-top: 140px;
`;

const PageHeader = styled.div`
  padding: 40px 60px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    padding: 24px 20px 0;
    flex-direction: column;
    align-items: stretch;
  }
`;

const PageTitle = styled.h1`
  font-family: "TrajanPro-Regular";
  font-size: 2.8rem;
  letter-spacing: 0.06em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ResultCount = styled.span`
  font-family: "Inter";
  font-size: 0.8rem;
  color: rgba(255, 253, 237, 0.4);
  letter-spacing: 0.05em;
`;

// ─── FILTERS BAR ─────────────────────────────
const FiltersBar = styled.div`
  display: flex;
  gap: 10px;
  padding: 24px 60px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

const FilterChip = styled.button`
  padding: 8px 20px;
  border-radius: 30px;
  border: 1px solid
    ${({ active }) =>
      active ? "rgba(255, 253, 237, 0.6)" : "rgba(255, 255, 255, 0.12)"};
  background: ${({ active }) =>
    active ? "rgba(255, 253, 237, 0.1)" : "transparent"};
  color: ${({ active }) =>
    active ? "#fffded" : "rgba(255, 253, 237, 0.5)"};
  font-family: "Inter";
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  white-space: nowrap;
  transition: all 0.25s ease;

  &:hover {
    border-color: rgba(255, 253, 237, 0.4);
    color: #fffded;
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 60px 16px;
  flex-wrap: wrap;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 20px 16px;
  }
`;

const FilterSelect = styled.select`
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  color: #fffded;
  font-family: "Inter";
  font-size: 0.8rem;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: rgba(255, 253, 237, 0.3);
  }

  option {
    background: #111;
    color: #fffded;
  }
`;

const ClearFilters = styled.button`
  font-family: "Inter";
  font-size: 0.75rem;
  color: rgba(255, 253, 237, 0.4);
  background: none;
  border: none;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #fffded;
  }
`;

// ─── GRID ────────────────────────────────────
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 60px 60px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 0 20px 40px;
  }
`;

const VehicleCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(20px);

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-4px) !important;

    img {
      transform: scale(1.05);
    }
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 5px 12px;
  border-radius: 20px;
  font-family: "Inter";
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: ${({ status }) =>
    status === "available"
      ? "rgba(34, 197, 94, 0.2)"
      : status === "reserved"
      ? "rgba(234, 179, 8, 0.2)"
      : "rgba(239, 68, 68, 0.2)"};
  color: ${({ status }) =>
    status === "available"
      ? "#4ade80"
      : status === "reserved"
      ? "#facc15"
      : "#f87171"};
  border: 1px solid
    ${({ status }) =>
      status === "available"
        ? "rgba(34, 197, 94, 0.3)"
        : status === "reserved"
        ? "rgba(234, 179, 8, 0.3)"
        : "rgba(239, 68, 68, 0.3)"};
  backdrop-filter: blur(8px);
`;

const BodyBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  padding: 5px 12px;
  border-radius: 20px;
  font-family: "Inter";
  font-size: 0.65rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 253, 237, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CardName = styled.h3`
  font-family: "TrajanPro-Regular";
  font-size: 1.05rem;
  color: #fffded;
  letter-spacing: 0.03em;
`;

const SpecRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;

  span {
    font-family: "Inter";
    font-size: 0.75rem;
    color: rgba(255, 253, 237, 0.4);
  }
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
`;

const DailyPrice = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;

  .amount {
    font-family: "TrajanPro-Regular";
    font-size: 1.3rem;
    color: #fffded;
  }

  .period {
    font-family: "Inter";
    font-size: 0.72rem;
    color: rgba(255, 253, 237, 0.4);
  }
`;

const BookLink = styled(Link)`
  font-family: "Inter";
  font-size: 0.75rem;
  color: #fffded;
  padding: 8px 18px;
  border: 1px solid rgba(255, 253, 237, 0.2);
  border-radius: 25px;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.06em;

  &:hover {
    background: rgba(255, 253, 237, 0.08);
    border-color: rgba(255, 253, 237, 0.4);
  }
`;

// ─── PAGINATION ──────────────────────────────
const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 0 60px 80px;
`;

const PageBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid
    ${({ active }) =>
      active ? "rgba(255, 253, 237, 0.5)" : "rgba(255, 255, 255, 0.1)"};
  background: ${({ active }) =>
    active ? "rgba(255, 253, 237, 0.1)" : "transparent"};
  color: ${({ active }) =>
    active ? "#fffded" : "rgba(255, 253, 237, 0.4)"};
  font-family: "Inter";
  font-size: 0.85rem;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255, 253, 237, 0.3);
    color: #fffded;
  }

  &:disabled {
    opacity: 0.3;
    pointer-events: none;
  }
`;

// ─── EMPTY STATE ─────────────────────────────
const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 120px 40px;
  text-align: center;

  h3 {
    font-family: "TrajanPro-Regular";
    font-size: 1.4rem;
    color: #fffded;
  }

  p {
    font-family: "Inter";
    font-size: 0.85rem;
    color: rgba(255, 253, 237, 0.4);
    max-width: 400px;
  }
`;

// ═══════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════

export default function RentalFleetPage({
  collection,
  totalCars,
  filters: serverFilters,
  dealership,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const gridRef = useRef(null);
  const currency = dealership?.rentalConfig?.currency || "JOD";

  // Active filters from URL
  const activeBodyType = searchParams.get("bodyType") || "";
  const activeFuel = searchParams.get("fuel") || "";
  const activeTransmission = searchParams.get("transmission") || "";
  const currentPage = parseInt(searchParams.get("page") || "1");

  // Animate cards on mount
  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gridRef.current.querySelectorAll("[data-fleet-card]");
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      });
    },
    { scope: gridRef, dependencies: [collection] }
  );

  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset to page 1 on filter change
    router.push(`/stock?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push("/stock", { scroll: false });
  };

  const goToPage = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`/stock?${params.toString()}`, { scroll: true });
  };

  const hasActiveFilters = activeBodyType || activeFuel || activeTransmission;
  const totalPages = Math.ceil(totalCars / 20);

  return (
    <Wrapper>
      <PageHeader>
        <div>
          <PageTitle>Our Fleet</PageTitle>
          <ResultCount>
            {totalCars} vehicle{totalCars !== 1 ? "s" : ""} available
          </ResultCount>
        </div>
      </PageHeader>

      {/* Body type quick filters */}
      {serverFilters?.bodyType?.length > 0 && (
        <FiltersBar>
          <FilterChip
            active={!activeBodyType}
            onClick={() => updateFilter("bodyType", "")}
          >
            All Types
          </FilterChip>
          {serverFilters.bodyType.map((type) => (
            <FilterChip
              key={type}
              active={activeBodyType === type}
              onClick={() =>
                updateFilter("bodyType", activeBodyType === type ? "" : type)
              }
            >
              {type}
            </FilterChip>
          ))}
        </FiltersBar>
      )}

      {/* Extended filters */}
      <FilterRow>
        {serverFilters?.fuel?.length > 0 && (
          <FilterSelect
            value={activeFuel}
            onChange={(e) => updateFilter("fuel", e.target.value)}
          >
            <option value="">All Fuel Types</option>
            {serverFilters.fuel.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </FilterSelect>
        )}

        {serverFilters?.transmission?.length > 0 && (
          <FilterSelect
            value={activeTransmission}
            onChange={(e) => updateFilter("transmission", e.target.value)}
          >
            <option value="">All Transmissions</option>
            {serverFilters.transmission.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </FilterSelect>
        )}

        {hasActiveFilters && (
          <ClearFilters onClick={clearAllFilters}>Clear all</ClearFilters>
        )}
      </FilterRow>

      {/* Vehicle Grid */}
      {collection.length > 0 ? (
        <>
          <Grid ref={gridRef}>
            {collection.map((car) => (
              <VehicleCard key={car._id} data-fleet-card>
                <Link href={`/stock/${car._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <CardImage>
                    {car.images?.[0] ? (
                      <img src={car.images[0]} alt={car.title} loading="lazy" />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "rgba(255,255,255,0.03)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "Inter",
                          fontSize: "0.8rem",
                          color: "rgba(255,253,237,0.15)",
                        }}
                      >
                        No Image
                      </div>
                    )}
                    <StatusBadge status={car.status || "available"}>
                      {car.status || "available"}
                    </StatusBadge>
                    {car.bodyType && <BodyBadge>{car.bodyType}</BodyBadge>}
                  </CardImage>
                  <CardContent>
                    <CardName>
                      {car.title || `${car.year} ${car.carMake} ${car.model}`}
                    </CardName>
                    <SpecRow>
                      <span>{car.transmission || "Automatic"}</span>
                      <span>•</span>
                      <span>{car.fuel || "Petrol"}</span>
                      <span>•</span>
                      <span>{car.seats || 5} Seats</span>
                      {car.mileage > 0 && (
                        <>
                          <span>•</span>
                          <span>
                            {car.mileage.toLocaleString()} km
                          </span>
                        </>
                      )}
                    </SpecRow>
                    {car.features?.length > 0 && (
                      <SpecRow>
                        {car.features.slice(0, 3).map((f) => (
                          <span key={f} style={{ color: "rgba(255,253,237,0.3)" }}>
                            {f}
                          </span>
                        ))}
                        {car.features.length > 3 && (
                          <span style={{ color: "rgba(255,253,237,0.25)" }}>
                            +{car.features.length - 3} more
                          </span>
                        )}
                      </SpecRow>
                    )}
                    <PriceRow>
                      <DailyPrice>
                        <span className="amount">
                          {car.dailyRate} {currency}
                        </span>
                        <span className="period">/ day</span>
                      </DailyPrice>
                      <BookLink href={`/stock/${car._id}`}>View Details</BookLink>
                    </PriceRow>
                  </CardContent>
                </Link>
              </VehicleCard>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <PaginationWrap>
              <PageBtn
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                ←
              </PageBtn>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 ||
                    p === totalPages ||
                    Math.abs(p - currentPage) <= 2
                )
                .map((p, idx, arr) => (
                  <span key={p} style={{ display: "flex", gap: "8px" }}>
                    {idx > 0 && arr[idx - 1] !== p - 1 && (
                      <span
                        style={{
                          color: "rgba(255,253,237,0.2)",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        …
                      </span>
                    )}
                    <PageBtn
                      active={p === currentPage}
                      onClick={() => goToPage(p)}
                    >
                      {p}
                    </PageBtn>
                  </span>
                ))}
              <PageBtn
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                →
              </PageBtn>
            </PaginationWrap>
          )}
        </>
      ) : (
        <EmptyState>
          <h3>No Vehicles Found</h3>
          <p>
            {hasActiveFilters
              ? "Try adjusting your filters to see more results."
              : "Our fleet is being updated. Check back soon!"}
          </p>
          {hasActiveFilters && (
            <ClearFilters
              onClick={clearAllFilters}
              style={{ fontSize: "0.85rem" }}
            >
              Clear all filters
            </ClearFilters>
          )}
        </EmptyState>
      )}
    </Wrapper>
  );
}
