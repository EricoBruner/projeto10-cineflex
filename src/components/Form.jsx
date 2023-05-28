import styled from "styled-components";

export default function Form({ formReserveSeats, setNameUser, setCpfUser }) {
  return (
    <FormContainer onSubmit={formReserveSeats}>
      <label htmlFor="nameUser">Nome do Comprador:</label>
      <input
        data-test="client-name"
        id="nameUser"
        placeholder="Digite seu nome..."
        onChange={(e) => setNameUser(e.target.value)}
        required
      />
      <label htmlFor="cpfUser">CPF do Comprador:</label>
      <input
        data-test="client-cpf"
        id="cpfUser"
        placeholder="Digite seu CPF..."
        onChange={(e) => setCpfUser(e.target.value)}
        required
      />
      <button data-test="book-seat-btn" type="submit">
        Reservar Assento(s)
      </button>
    </FormContainer>
  );
}

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
