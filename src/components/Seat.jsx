import styled from "styled-components";

export default function Seat({ seat }) {
  const reserveSeat = (id) => {};

  return (
    <SeatItem
      key={seat.id}
      isAvailable={seat.isAvailable}
      onClick={() => {
        reserveSeat();
      }}
    >
      {seat.name}
    </SeatItem>
  );
}

const SeatItem = styled.div`
  border: ${({ isAvailable }) => {
    return isAvailable ? "1px solid #808F9D" : "1px solid #F7C52B";
  }};
  background-color: ${({ isAvailable }) => {
    return isAvailable ? "#C3CFD9" : "#FBE192";
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
