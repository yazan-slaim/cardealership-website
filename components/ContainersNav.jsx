"use client";

import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";

const SearchBarContainer = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  background: black;
  width: 100%;
`;
const SearchInput = styled.input`
  padding: 8px 35px 8px 10px;
  font-size: 16px;
  width: 100%;
  background: black;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
`;
const SearchIcon = styled.div`
  padding: 5px 0px 5px 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;
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
  overflow: hidden;
  white-space: nowrap;
  background: black;
`;
const OrderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  overflow: hidden;

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
  }
  background: black;
`;
const FiltersContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex: 8;

  flex-wrap: wrap;
  background: black;
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
const Containers = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: transform 1s ease-in-out;
  position: absolute;
  top: 100%;
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
const ItemGroup = styled.div`
  border-bottom: 1px solid black;
  height: auto;
  transition: height 0.3s ease-in-out;
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px; /* Size of the white square */
    height: 10px; /* Size of the white square */
    background: white; /* White color for the square */
  }
`;
const BottomHeader = styled.div`
  height: 150px;
  width: 100%;
  background: blue;
  position: absolute;
  top: 100%;
  left: 0;
`;

const HiddenContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%; /* Ensure initially hidden */
  z-index: -1;
`;

const Content = styled.div`
  flex: 1;
  background: ${({ bg }) => bg || "gray"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0%; /* Ensure initially hidden */
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

const properties = [
  { id: "carMake", label: "Car Make", bg: "green" },
  { id: "color", label: "Color", bg: "purple" },
  { id: "model", label: "Model", bg: "blue" },
  { id: "year", label: "Year", bg: "orange" },
  { id: "price", label: "Price", bg: "red" },
  { id: "mileage", label: "Mileage", bg: "yellow" },
  { id: "condition", label: "Condition", bg: "pink" },
];

const ItemGroupList = styled.div`
  padding: 5px;
  display: flex;
  align-items: center;
  label {
    margin: 10px;
  }
`;
const ItemGroupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
`;

export default function ContainersNav({ showExtraComponents }) {
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
  const [visibleDetailBox, setVisibleDetailBox] = useState(
    Array(filters.length).fill(false)
  );

  const toggleDetailBox = (index) => {
    setVisibleDetailBox(
      visibleDetailBox.map((item, i) => (i === index ? !item : false))
    );
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const [checkedState, setCheckedState] = useState([]);

  useEffect(() => {
    async function fetchFilters() {
      const filtersWithChecked = filters.map((filter) => ({
        ...filter,
        options: filter.options.map((option) => ({
          ...option,
          checked: false,
        })),
      }));
      setCheckedState(filtersWithChecked);
    }
    fetchFilters();
  }, []);

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
  return (
    <Containers show={showExtraComponents}>
      <SearchBarContainer>
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
      <FiltersBarContainer>
        <OutputContainer>
          <h1>24 Results Found</h1>
        </OutputContainer>
        <FiltersContainer>
          {filters.map((filter, index) => (
            <div key={index}>
              <FilterButton onClick={() => toggleDetailBox(index)}>
                {filter.name}
              </FilterButton>
            </div>
          ))}
        </FiltersContainer>

        <OrderContainer>
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
            <span></span>
          </div>
        </OrderContainer>
      </FiltersBarContainer>
      <DetailBoxContainer show={showExtraComponents}>
        {filters.map((filter, index) => (
          <DetailBox show={visibleDetailBox[index]}>
            <ItemGroup key={filter.id}>
              <ItemGroupHeader>
                <h3>Select {filter.name}</h3>
              </ItemGroupHeader>

              <ul className="item-list">
                {filter.options.map((option) => (
                  <li key={option.value}>
                    <ItemGroupList>
                      <CustomCheckbox
                        type="checkbox"
                        id={`custom-checkbox-${option.value}`}
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
                      <label htmlFor={`custom-checkbox-${option.value}`}>
                        {option.label}
                      </label>
                    </ItemGroupList>
                  </li>
                ))}
              </ul>
            </ItemGroup>
          </DetailBox>
        ))}
      </DetailBoxContainer>
    </Containers>
  );
}
