import styled from "styled-components";

export default function Movie({ id, overview, posterURL }) {
  return (
    <MovieContainer key={id}>
      <img src={posterURL} alt={overview} />
    </MovieContainer>
  );
}

const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
`;
