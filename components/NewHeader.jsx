"use client";
import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import { useMenu } from "@/contexts/MenuContext";
import { MenuIcon } from "@/public/svgs/Menu-Icon";
import Link from "next/link";

const Header = styled.div`
  position: fixed;
  width: 100vw;
  display: flex;
  flex-direction: column;
  z-index: 99999;
  color: white;
  mix-blend-mode: ${({ isStockPage, isHomePage }) =>
    isStockPage || isHomePage ? "normal" : "difference"};
    font-family: "TrajanPro-Regular";
    *,p{
          font-family: "TrajanPro-Regular";

    }
`;



const TopHeader = styled.div`
  padding: 40px 35px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 99;
  background: ${({ isStockPage }) => (isStockPage ? "black" : "transparent")};
  border-bottom: ${({ isStockPage }) =>
    isStockPage ? "1px solid rgba(255, 255, 255, 0.3);" : "none"};
`;
const BottomHeader = styled.div`
  height: 50px;
  width: 100%;
  background: black;
  position: absolute;
  top: 99%;
  z-index: -1;
  left: 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
`;
const SearchBarContainer = styled.div`
  display: flex;
  background: transparent;
  width: 100%;
  overflow: hidden;
  transition: height 0.5s ease;
  height: 0;
  border-top: ${({ isVisible, isStockPage }) =>
    isVisible && !isStockPage ? "1px solid rgba(255, 255, 255, 0.3)" : "none"};
  border-bottom: ${({ isStockPage }) =>
    isStockPage ? "1px solid rgba(255, 255, 255, 0.3);" : "none"};
      background: black;

`;
const SearchInput = styled.input`
  padding: 8px 35px 8px 10px;
  font-size: 16px;
  width: 100%;
  background: transparent;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  background: black;
`;
const SearchIcon = styled.div`
  padding: 5px 0px 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
`;
const HiddenContent = styled.div`
  position: relative;
  width: 100%;
  padding: 30px 0;
  top: -100%; /* Ensure initially hidden */
  z-index: -1;
  border: 1px solid red;
`;

const Content = styled.div`
  flex: 1;
  background: ${({ bg }) => "black" || "gray"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  top: 300%;
  padding: 30px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 99999;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%; /* Make buttons full height to center them */
  align-items: center;
`;
const FilterButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
  border-radius: 20px;
  padding: 0 40px 0 40px;
  font-size: small;
  max-width: 120px;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    color: black;

    background: white;
  }
`;
const FiltersBarContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  gap: 10px;
  width: 100%;
  position: relative;
  background: black;
`;
const OutputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  white-space: nowrap;
  background: black;
  h1 {
    white-space: nowrap;
  }
`;

const OrderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  background: black;
  position: relative;
  cursor: pointer; /* Add cursor to indicate clickable */

  div {
    display: flex;
    border: 1px solid rgba(255, 255, 255, 0.3);
    width: 100%;
  }

  svg {
    flex: 1;
  }

  span {
    flex: 7;
    text-align: center;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%; /* directly below the button */
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto; /* in case there are more options */
  display: flex;
  flex-direction: column;
  background: black;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform-origin: top center;
  transform: scaleY(0);
  opacity: 0;
  pointer-events: none;
  z-index: 9999;
`;


// Add some styling for the dropdown items
const DropdownItem = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 8;
  flex-wrap: wrap;
  background: black;
`;
const ItemGroupList = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  label {
    margin: 10px;
  }
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: absolute;
  top: 100%;
  width: 100vw;
  transform: translateY(-100%);
  background: black;
`;

const FilterTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const FilterLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  cursor: pointer;

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;
const ItemGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;
const CustomCheckbox = styled.input`
  width: 20px; /* Define your desired width */
  height: 20px; /* Define your desired height */
  appearance: none;
  position: relative;
  cursor: pointer;
  background: ${(props) =>
    props.checked
      ? "black"
      : "white"}; /* White background, becomes black when checked */

  &::before {
    content: ${(props) => (props.checked ? '""' : "none")};
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px; /* Size of the white square */
    height: 10px; /* Size of the white square */
    background: white; /* White color for the square */
  }
`;
const ItemGroup = styled.div`
  border-bottom: 1px solid black;
  height: auto;
  transition: height 0.3s ease-in-out;
`;

const DetailBox = styled.div`
  padding: 20px;
  background: black;
  color: white;
  position: absolute;
  top: 100%; // Position it right below the FiltersContainer
  left: 0;
  width: 100%;

  transform: translateY(${(props) => (props.show ? "0" : "-100%")});
  // Add a delay of 0.5s to the opacity transition
  transition: transform 0.5s ease-in-out;
  pointer-events: ${(props) => (props.show ? "auto" : "none")};
`;
const DetailBoxContainer = styled.div`
  position: relative;
  z-index: -1;
  transform: translateY(${(props) => (props.show ? "0" : "-100%")});
`;

const DoubleBottomHeader = styled.div`
  height: 150px;
  position: relative;
  border: 1px solid red;
`;
const sortOptions = [
  { name: "Newest", value: "/?date=desc" },
  { name: "Price, low to high", value: "/?price=asc" },
  { name: "Price, high to low", value: "/?price=desc" },
];

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

export default function NewHeader() {
  const pathname = usePathname();
  const containerRef = useRef(null);
  const searchHeaderRef = useRef(null);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);
  const [interactive, setInteractive] = useState(true);
  const [filters, setFilters] = useState([]);
const isHomePage = pathname === "/";

/*
  const filters = [
    {
      id: "color",
      name: "Color",
      options: [
        { value: "Silver", label: "Silver" },
        { value: "Blue", label: "Blue" },
      ],
    },
    {
      id: "carmake",
      name: "Car Make",
      options: [
        { value: "bmw", label: "bmw" },
        { value: "mercedes", label: "mercedes" },
      ],
    },
  ];
  */
  const [visibleDetailBox, setVisibleDetailBox] = useState(
    Array(filters.length).fill(false)
  );

  const toggleDetailBox = (index) => {
    setVisibleDetailBox(
      visibleDetailBox.map((item, i) => (i === index ? !item : false))
    );
  };
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(sortOptions[0]);
  const searchParams = useSearchParams();
  const [checkedState, setCheckedState] = useState([]);
  const [carCount, setCarCount] = useState(null);

  useEffect(() => {
    const fetchCarCount = async () => {
      const response = await fetch("/api/stock", {
        method: "POST",
        body: JSON.stringify({ searchValues }),
      });
      const data = await response.json();
      setCarCount(data.count);
    };

    fetchCarCount();
  }, []);
  useEffect(() => {
    if (prevPath !== pathname) {
      setInteractive(false); // Disable interactivity
      gsap.to(containerRef.current, {
        opacity: 1,
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
useEffect(() => {
  const fetchFilters = async () => {
    const res = await fetch("/api/filters");
    const data = await res.json();

    if (data.success) {
      const formattedFilters = Object.entries(data.filters).map(
        ([key, values]) => ({
          id: key, // e.g. "color"
          name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
          options: values.map((val) => ({
            value: val,
            label: val,
          })),
        })
      );
      setFilters(formattedFilters);
    }
  };

  fetchFilters();
}, []);

useEffect(() => {
  if (filters.length > 0) {
    const filtersWithChecked = filters.map((filter) => ({
      ...filter,
      options: filter.options.map((option) => ({
        ...option,
        checked: false,
      })),
    }));
    setCheckedState(filtersWithChecked);
  }
}, [filters]); // run whenever filters change

useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());
  const matchedOption = sortOptions.find((opt) => {
    const [key, value] = opt.value.replace("/?", "").split("=");
    return params.get(key) === value;
  });
  setSelectedOption(matchedOption || sortOptions[0]);
}, [searchParams]);

useEffect(() => {
  const price = searchParams.get("price");
  const date = searchParams.get("date");

  if (price === "asc") {
    setSelectedOption(sortOptions.find((opt) => opt.value === "/?price=asc"));
  } else if (price === "desc") {
    setSelectedOption(sortOptions.find((opt) => opt.value === "/?price=desc"));
  } else if (date === "desc") {
    setSelectedOption(sortOptions.find((opt) => opt.value === "/?date=desc"));
  } else {
    setSelectedOption(sortOptions[0]); // Default fallback: "Newest"
  }
}, [searchParams]);

  const searchValues = Array.from(searchParams.entries());

  const handleOnChange = (filterId, optionValue) => {
    const updatedCheckedState = [...checkedState];
    const filterToUpdate = updatedCheckedState.find(
      (filter) => filter.id === filterId
    );

    if (filterToUpdate) {
      const optionToUpdate = filterToUpdate.options.find(
        (option) => option.value === optionValue
      );

      if (optionToUpdate) {
        optionToUpdate.checked = !optionToUpdate.checked;
        setCheckedState(updatedCheckedState);
      }
    }
  };
  function getCheckedValuesAsString(sectionId) {
    const section = checkedState.find((filter) => filter.id === sectionId);
    if (!section) {
      return "";
    }

    const checkedValues = section.options
      .filter((option) => option.checked)
      .map((option) => option.value)
      .join(",");

    return checkedValues;
  }
  const bottomHeaderRef = useRef(null);

  const contentRefs = useRef([]);
  useEffect(() => {
    contentRefs.current = filters.map(() => React.createRef());
  }, [filters]);
    const lastScrollY = useRef(0);
  const [activeContent, setActiveContent] = useState(null);

  const activeRef =
    contentRefs.current[
      filters.findIndex((property) => property.id === activeContent)
    ];

  const toggleSearchBar = () => {
    setSearchBarVisible((prevVisible) => !prevVisible);
    if (searchBarVisible) {
      gsap.to(searchHeaderRef.current, {
        height: "0px",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(searchHeaderRef.current, {
        height: "50px",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };
useEffect(() => {
  if (pathname !== "/stock") return; // only run on stock page

  const handleScroll = () => {
    if (!bottomHeaderRef.current) return;

    if (window.scrollY > lastScrollY.current) {
      gsap.to(bottomHeaderRef.current, {
        top: "-100%",
        duration: 1.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(bottomHeaderRef.current, {
        top: "99%",
        duration: 1,
        ease: "power2.out",
      });
    }
    lastScrollY.current = window.scrollY;
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [pathname]);

  const handleContentToggle = (contentId) => {
    const newActiveContent = contentRefs.current.find(
      (ref, index) => filters[index].id === contentId
    );

    if (activeContent === contentId) {
      gsap.to(newActiveContent.current, {
        y: "-100%",
        duration: 1,
        ease: "power2.out",
      });
    } else {
      contentRefs.current.forEach((ref, index) => {
        if (filters[index].id !== contentId) {
          gsap.to(ref.current, {
            y: "-100%",
            duration: 1,
            ease: "power2.out",
            onComplete: () => {
              contentRefs.current.forEach((ref, index) => {
                if (filters[index].id === contentId) {
                  gsap.to(ref.current, {
                    y: "0%",
                    duration: 1,
                    ease: "power2.out",
                  });
                }
              });
            },
          });
        }
      });
    }

    setActiveContent(contentId);
  };
  const isStockPage = pathname === "/stock";
  const { openMenu } = useMenu();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  /*
  const handleOrderContainerClick = () => {
    setDropdownVisible((prev) => !prev); // Toggle dropdown visibility

    // Animate dropdown menu with GSAP
    if (!dropdownVisible) {
      gsap.to(dropdownRef.current, {
        duration: 0.3,
        height: "150px",
        pointerEvents: "auto",
        ease: "power2.out",
      });
    } else {
      gsap.to(dropdownRef.current, {
        duration: 0.3,
        height: "0px",
        pointerEvents: "none",
        ease: "power2.out",
      });
    }
  };
  */
 const handleOrderContainerClick = () => {
  setDropdownVisible((prev) => !prev);

  if (!dropdownVisible) {
    gsap.to(dropdownRef.current, {
      duration: 0.35,
      scaleY: 1,
      opacity: 1,
      ease: "power2.out",
      transformOrigin: "top center",
      pointerEvents: "auto",
    });
  } else {
    gsap.to(dropdownRef.current, {
      duration: 0.25,
      scaleY: 0,
      opacity: 0,
      ease: "power2.in",
      pointerEvents: "none",
    });
  }
};

const handleOptionSelect = (option) => {
  setSelectedOption(option);
  setDropdownVisible(false);
  const params = new URLSearchParams(window.location.search);
  const queryString = option.value.startsWith("/?")
    ? option.value.slice(2) // remove "/?"
    : option.value;
  const [key, value] = queryString.split("=");
  params.set(key, value);
  router.replace(`/stock?${params.toString()}`, { scroll: false });
};

const handleSearchSubmit = (event) => {
  event.preventDefault();
  const searchValue = event.target.search.value.trim();
  if (!searchValue) return; // avoid empty searches
  router.replace(
    `/stock?search=${encodeURIComponent(searchValue)}`,
    { scroll: false } // keep scroll position if you want
  );
};

  return (
    <Header   ref={containerRef}
  interactive={interactive}
  isStockPage={isStockPage}
  isHomePage={isHomePage}>
      <TopHeader isStockPage={isStockPage}>
<button
  onClick={openMenu}
  style={{
    display: "flex",
    flex: 1,
    alignItems: "center",
    gap: "6px",
  }}
>

          <MenuIcon />
         <p> MENU</p>
        </button>

        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "1rem" }}>Logo</h1>
        </div>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "end",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <button onClick={toggleSearchBar}><p>FIND A CAR</p></button>{" "}
        </div>
      </TopHeader>
      <form onSubmit={handleSearchSubmit}>
        <SearchBarContainer
          ref={searchHeaderRef}
          isVisible={searchBarVisible}
          isStockPage={isStockPage}
        >
          <SearchIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </SearchIcon>

          <SearchInput
            id="search"
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            defaultValue={""}
          />
        </SearchBarContainer>
      </form>

      {pathname === "/stock" && (
        <>
          {" "}
          <BottomHeader ref={bottomHeaderRef}>
            <FiltersBarContainer>
              <OutputContainer>
                <h1>{carCount} Results Found</h1>
              </OutputContainer>
              <FiltersContainer>
                {filters.map((property) => (
                  <FilterButton
                    key={property.id}
                    onClick={() => handleContentToggle(property.id)}
                  >
                    {property.name}
                  </FilterButton>
                ))}
              </FiltersContainer>
              <OrderContainer onClick={handleOrderContainerClick}>
                <div style={{position:"relative"}}>
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                  <span>{selectedOption.name}</span>
                        <DropdownMenu ref={dropdownRef} show={dropdownVisible}>
                  {sortOptions.map((option) => (
                    <DropdownItem
                      key={option.name}
                      onClick={() => handleOptionSelect(option)}
                    >
                      {option.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
                </div>
          
              </OrderContainer>
            </FiltersBarContainer>
            {/*filters.map((filter, index) => (
        <Content key={filter.id} ref={contentRefs.current[index]}>
          <h1>{filter.label}</h1>
          <DetailBox>
            <ItemGroup key={filter.id}>
              <FilterTitle>{filter.name}</FilterTitle>
              {filter.options.map((option) => (
                <FilterLabel key={option.value}>
                  <input
                    type="checkbox"
                    checked={searchValues.some(
                      ([key, value]) =>
                        key === filter.id &&
                        value.split(",").includes(option.value)
                    )}
                    onChange={(event) => {
                      handleOnChange(filter.id, option.value);
                      const params = new URLSearchParams(searchParams);
                      const checked = checkedState
                        .find((filter) => filter.id === filter.id)
                        .options.some(
                          (option) =>
                            option.value === filter.value &&
                            option.checked === false
                        );

                      const checkedValues = getCheckedValuesAsString(
                        filter.id
                      );

                      checked
                        ? params.delete(filter.id)
                        : params.set(filter.id, checkedValues);

                      router.push(`/stock/?${params.toString()}`);
                    }}
                  />
                  {option.label}
                </FilterLabel>
              ))}
            </ItemGroup>
          </DetailBox>
        </Content>
      ))*/}
            <div style={{ position: "absolute", top: "100%", zIndex: "-1" }}>
 {filters.map((filter, index) => (
  <FilterSection key={filter.id} ref={contentRefs.current[index]}>
    <FilterTitle>{filter.name}</FilterTitle>
    {filter.options.map((option) => {
      const filterFromState = checkedState.find((f) => f.id === filter.id);
      const isChecked =
        filterFromState?.options.find((o) => o.value === option.value)?.checked ||
        false;

      return (
        <FilterLabel key={option.value}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => {
              // update local checked state
              handleOnChange(filter.id, option.value);

              // update query params in URL
              const params = new URLSearchParams(searchParams);
              const checkedValues = getCheckedValuesAsString(filter.id);
              if (checkedValues) {
                params.set(filter.id, checkedValues);
              } else {
                params.delete(filter.id);
              }
              router.push(`/stock/?${params.toString()}`);
            }}
          />
          {option.label}
        </FilterLabel>
      );
    })}
  </FilterSection>
))}


            </div>
          </BottomHeader>
        </>
      )}
    </Header>
  );
}
