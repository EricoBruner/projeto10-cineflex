import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { getMovieSessionSeats, reserveSeats } from "../../services/api";
import Seat from "../../components/Seat";

export default function SeatsPage({ setDataSuccess }) {
  const { idSessao } = useParams();
  const navigate = useNavigate();

  let [seats, setSeats] = useState([]);
  let [movie, setMovie] = useState(null);
  let [nameUser, setNameUser] = useState("");
  let [cpfUser, setCpfUser] = useState("");
  let [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    getMovieSessionSeats(idSessao).then(([apiMovieSessionSeats, apiMovie]) => {
      setSeats(apiMovieSessionSeats);
      setMovie(apiMovie);
    });
  }, []);

  const formReserveSeats = (e) => {
    e.preventDefault();

    const reserve = {
      ids: selectedSeats,
      name: nameUser,
      cpf: cpfUser,
    };

    reserveSeats(reserve).then(() => {
      setDataSuccess({
        dataMovie: movie,
        dataUser: reserve,
      });
      navigate("/sucesso");
    });
  };

  const addSeatReserve = (id) => {
    let newSelectedSeats = [...selectedSeats];
    newSelectedSeats.push(id);
    setSelectedSeats(newSelectedSeats);
  };

  const removeSeatReserve = (id) => {
    const indexSeatReserve = selectedSeats.findIndex((seat) => seat === id);
    let newSelectedSeats = [...selectedSeats];
    newSelectedSeats.splice(indexSeatReserve, 1);
    setSelectedSeats(newSelectedSeats);
  };

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats.map((seat) => (
          <Seat
            key={seat.id}
            seat={seat}
            addSeatReserve={addSeatReserve}
            removeSeatReserve={removeSeatReserve}
          />
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle state={"Selecionado"} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle state={"Disponível"} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle state={"Indisponível"} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <FormContainer onSubmit={formReserveSeats}>
        <label htmlFor="nameUser">Nome do Comprador:</label>
        <input
          id="nameUser"
          placeholder="Digite seu nome..."
          onChange={(e) => setNameUser(e.target.value)}
          required
        />
        <label htmlFor="cpfUser">CPF do Comprador:</label>
        <input
          id="cpfUser"
          placeholder="Digite seu CPF..."
          onChange={(e) => setCpfUser(e.target.value)}
          required
        />
        <button type="submit">Reservar Assento(s)</button>
      </FormContainer>
      <FooterContainer>
        {movie && (
          <>
            <div>
              <img src={movie.movie.posterURL} alt="poster" />
            </div>
            <div>
              <p>{movie.movie.overview}</p>
              <p>
                {movie.day.weekday} - {movie.name}
              </p>
            </div>
          </>
        )}
      </FooterContainer>
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
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: ${({ state }) => {
    switch (state) {
      case "Selecionado":
        return "1px solid #0E7D71";
      case "Indisponível":
        return "1px solid #F7C52B";
      case "Disponível":
        return "1px solid #808F9D";
    }
  }};

  background-color: ${({ state }) => {
    switch (state) {
      case "Selecionado":
        return "#1AAE9E";
      case "Indisponível":
        return "#FBE192";
      case "Disponível":
        return "#C3CFD9";
    }
  }};

  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
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
