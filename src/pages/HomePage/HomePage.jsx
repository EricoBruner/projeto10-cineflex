import { useEffect, useState } from "react";
import styled from "styled-components";

import { getAllMovies } from "../../services/api";
import Movie from "../../components/Movie";

export default function HomePage() {
  let [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies().then((apiMovies) => setMovies(apiMovies));
  }, []);

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {movies.map((movie) => (
          <Movie
            key={movie.id}
            overview={movie.overview}
            posterURL={movie.posterURL}
            id={movie.id}
          />
        ))}
      </ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;

const ListContainer = styled.div`
  width: 330px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
