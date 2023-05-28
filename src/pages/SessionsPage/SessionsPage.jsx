import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Session from "../../components/Session";

import { getMovieSessions } from "../../services/api";
import Footer from "../../components/Footer";

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
          <Session key={session.id} session={session} />
        ))}
      </div>
      <Footer title={movie.title} posterURL={movie.posterURL} />
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
