import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { getMovieSessionSeats, reserveSeats } from "../../services/api";
import Seat from "../../components/Seat";
import Footer from "../../components/Footer";
import Caption from "../../components/Caption";
import Form from "../../components/Form";

export default function SeatsPage({ setDataSuccess }) {
  const { idSessao } = useParams();
  const navigate = useNavigate();

  let [seats, setSeats] = useState([]);
  let [movie, setMovie] = useState(null);
  let [nameUser, setNameUser] = useState("");
  let [cpfUser, setCpfUser] = useState("");
  let [selectedSeats, setSelectedSeats] = useState([]);
  let [numberSelectedSeats, setNumberSelectedSeats] = useState([]);

  useEffect(() => {
    getMovieSessionSeats(idSessao).then(([apiMovieSessionSeats, apiMovie]) => {
      setSeats(apiMovieSessionSeats);
      setMovie(apiMovie);
      console.log(apiMovie);
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
        dataSeatsName: numberSelectedSeats,
      });
      navigate("/sucesso");
    });
  };

  const addSeatReserve = (id, name) => {
    let newSelectedSeats = [...selectedSeats];
    let newNumberSelectedSeats = [...numberSelectedSeats];

    newSelectedSeats.push(id);
    newNumberSelectedSeats.push(name);

    setSelectedSeats(newSelectedSeats);
    setNumberSelectedSeats(newNumberSelectedSeats);
  };

  const removeSeatReserve = (id, name) => {
    const indexSeatReserve = selectedSeats.findIndex((seat) => seat === id);
    const indexNumberSeatReserve = numberSelectedSeats.findIndex(
      (seatName) => seatName === name
    );

    let newSelectedSeats = [...selectedSeats];
    let newNumberSelectedSeats = [...numberSelectedSeats];

    newSelectedSeats.splice(indexSeatReserve, 1);
    newNumberSelectedSeats.splice(indexNumberSeatReserve, 1);

    setSelectedSeats(newSelectedSeats);
    setNumberSelectedSeats(newNumberSelectedSeats);
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
      <Caption />
      <Form
        formReserveSeats={formReserveSeats}
        setCpfUser={setCpfUser}
        setNameUser={setNameUser}
      />
      {movie && (
        <Footer
          title={movie.movie.title}
          overview={movie.movie.overview}
          posterURL={movie.movie.posterURL}
          dayWeekday={movie.day.weekday}
          hour={movie.name}
        />
      )}
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
