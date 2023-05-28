import styled from "styled-components";

export default function Caption() {
  return (
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
  );
}

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;

const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
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
