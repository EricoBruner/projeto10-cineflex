import styled from "styled-components";
import { getMovieSessions } from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function SessionsPage() {
  const { idFilme } = useParams();
  let [sessions, setSessions] = useState([]);
  let [movie, setMovie] = useState({});

  useEffect(() => {
    getMovieSessions(idFilme).then(([apiMovieSessions, movie]) => {
      setSessions(apiMovieSessions);
      setMovie(movie);
    });
  }, []);

  return (
    <PageContainer>
      Selecione o horário
      <div>
        {sessions.map((session) => (
          <SessionContainer key={session.id}>
            {session.weekday} - {session.date}
            <ButtonsContainer>
              {session.showtimes.map((showtime) => (
                <Link key={showtime.id} to={`/assentos/${showtime.id}`}>
                  <button>{showtime.name}</button>
                </Link>
              ))}
            </ButtonsContainer>
          </SessionContainer>
        ))}
      </div>
      <FooterContainer>
        <div>
          <img src={movie.posterURL} alt={movie.title} />
        </div>
        <div>
          <p>{movie.overview}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;
  left: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
