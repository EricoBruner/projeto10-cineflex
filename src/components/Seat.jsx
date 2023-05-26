import { useState } from "react";
import styled from "styled-components";

export default function Seat({ seat, addSeatReserve }) {
  let [isSelected, setIsSelected] = useState(false);

  const reserveSeat = (id) => {
    setIsSelected(true);
    addSeatReserve(id);
  };

  return (
    <SeatItem
      isAvailable={seat.isAvailable}
      isSelected={isSelected}
      onClick={() => {
        seat.isAvailable && reserveSeat(seat.id);
      }}
    >
      {seat.name}
    </SeatItem>
  );
}

const SeatItem = styled.div`
  border: ${({ isAvailable, isSelected }) => {
    if (isSelected) {
      return "1px solid #0E7D71";
    }
    return isAvailable ? "1px solid #808F9D" : "1px solid #F7C52B";
  }};

  background-color: ${({ isAvailable, isSelected }) => {
    if (isSelected) {
      return "#1AAE9E";
    }
    return isAvailable ? "#C3CFD9" : "#FBE192";
  }};

  cursor: ${({ isAvailable }) => {
    return isAvailable ? "pointer" : "not-allowed";
  }};

  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
