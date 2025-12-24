"use client";
import styled from "@emotion/styled";
import "@splidejs/splide/css/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { onPageEnter, onPageLeave } from "@/utils/animation";
import { useGSAP } from "@gsap/react";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  color: white;
  padding: 10px;
  background: black;
  padding-top: 170px;
`;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  color: white;
  background: url("https://static.dezeen.com/uploads/2017/11/design-museum-ferrari-exhibition_dezeen_2364_col_25.jpg");
  background-position: center;
  background-size: cover;
`;

const LuxuryText = styled.div`
  text-align: center;
  width: 385px;
  h1 {
    font-size: 59.33px;
  }
  p {
    font-size: 14px;
  }
`;
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Creates three columns of equal width
  padding: 15px 10px; // Padding around the entire grid
  gap: 10px;
  width: 100%; // Full width of the container
`;
const GridItem = styled.div`
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  overflow: hidden;
`;
const GridItemFirst = styled.div`
  background: url("https://wallpapers-fenix.eu/full/201231/203659157.jpg");
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
  height: 272px;
  padding: 5px;
`;
const Price = styled.h1`
  position: absolute;
  bottom: 5px;
  left: 10px;
  padding: inherit;
`;
const Logo = styled.img`
  position: absolute;
  top: 5px;
  right: 10px;
  height: 30px;
  width: auto;
`;

const TitleHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 59.33px;
`;
const GridItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;
const GridItemDetailsTitle = styled.div`
  padding: 5px;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 22.66px;
  white-space: nowrap;
`;
const IconsContainer = styled.div`
  display: flex;
  padding: 8px 8px 8px 8px;
  width: 100%;
  justify-content: space-between;
  div {
    display: flex;
    gap: 10px;
    font-size: 14px;
    align-items: center;
    p {
      white-space: nowrap;
    }
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 5%;
  padding: 0px 10px 0px 10px;

  button {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 14px;
    transition: all 0.3s ease;

    &:hover {
      color: black;
      background: white;
    }
  }
`;
const StyledLink = styled(Link)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    color: black;
    background: white;
  }
`;
const StyledA = styled.a`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    color: black;
    background: white;
  }
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 40px 0;
`;

const PaginationButton = styled.button`
padding: 10px;
  background: transparent;
  color: ${({ active }) => (active ? "white" : "rgba(255, 255, 255, 0.5)")};
  border: none;
  font-size: 16px;
 // font-weight: ${({ active }) => (active ? "600" : "400")};
  cursor: pointer;
  transition: color 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: white;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: "translateY(0)"
      },
      {
        opacity: 0.2,
        transform: "translateY(-35%)"
      }
    ],
    {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-old(root)"
    }
  );

  document.documentElement.animate(
    [
        {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
        },
        {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        }
    ],
     {
      duration: 1500,
      easing: "cubic-bezier(0.87, 0, 0.13, 1)",
      fill: "forwards",
      pseudoElement: "::view-transition-new(root)"
    }
  )
}
export default function StockPage({ collection, totalCars }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const mainRef= useRef(null)

  const carsPerPage = 20;
  const currentPage = parseInt(searchParams.get("page") || "1");
  const totalPages = Math.ceil(totalCars / carsPerPage);

const goToPage = async (page) => {
  // Prevent double-clicks
  if (page === currentPage) return;



  const params = new URLSearchParams(searchParams);
  params.set("page", page);

  // Navigate & refresh
  router.push(`${pathname}?${params.toString()}`, { scroll: false });
  router.refresh();
};




  return (
    <Wrapper ref={mainRef}>
      <Splide
        aria-label="My Favorite Images"
        options={{
          perPage: 1,
          type: "loop",
          height: "440px",
          width: "100%",
          pagination: true,
          paginationDirection: true,
          arrows: false,
          interval: 5000,
          autoplay: true,
          speed: 2500,
          autoHeight: true,
        }}
      >
        <SplideSlide>
          <LayoutContainer>
            <LuxuryText>
              <h1> ATTENTIVE</h1>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </LuxuryText>
          </LayoutContainer>
        </SplideSlide>
        <SplideSlide>
          <LayoutContainer>
            <LuxuryText>
              <h1> LUXURY</h1>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
            </LuxuryText>
          </LayoutContainer>
        </SplideSlide>
      </Splide>
      <TitleHeader>
        <h1>CARS FOUND</h1>
      </TitleHeader>
      <GridContainer>
        {collection.map((car) => (
          <GridItem key={car._id}>
            <GridItemFirst
              style={{
                backgroundImage: `url(${car.images[0]})`,
              }}
            >
              <Price>{`$${car.price}`}</Price>
              <Logo src={car.logoImage} />
            </GridItemFirst>
            <GridItemDetails>
              <GridItemDetailsTitle>{car.title}</GridItemDetailsTitle>
              <IconsContainer>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p>{car.year}</p>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p>{car.condition}</p>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p>{car.mileage}</p>
                </div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  <p>{car.color}</p>
                </div>
              </IconsContainer>
              <ButtonsContainer>
                <StyledA
    href={`/stock/${car._id}`}
    onClick={(e) => {
      e.preventDefault();
      router.push(`/stock/${car._id}`, { onTransitionReady: slideInOut });
    }}
  >view</StyledA>
                <button>enquire</button>
              </ButtonsContainer>
            </GridItemDetails>
          </GridItem>
        ))}
      </GridContainer>
      <PaginationContainer>
  <PaginationButton disabled={currentPage === 1} onClick={() => goToPage(1)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20 9 12l10-8v16zM9 20 3 12l6-8v16z" />
    </svg>
  </PaginationButton>

  <PaginationButton disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
    </svg>
  </PaginationButton>

  {[...Array(totalPages)].map((_, i) => {
    const page = i + 1;
    return (
      <PaginationButton
        key={page}
        active={page === currentPage}
        onClick={() => goToPage(page)}
      >
        {page}
      </PaginationButton>
    );
  })}

  <PaginationButton disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
    </svg>
  </PaginationButton>

  <PaginationButton disabled={currentPage === totalPages} onClick={() => goToPage(totalPages)}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 4l10 8-10 8V4zM15 4l6 8-6 8V4z" />
    </svg>
  </PaginationButton>
</PaginationContainer>


    </Wrapper>
  );
}
