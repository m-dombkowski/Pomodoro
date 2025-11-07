import styled from "styled-components";
import CustomTimer from "../components/CustomTimer";

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
`;

export default function Home() {
  return (
    <MainWrapper>
      <Title>Home</Title>
      <CustomTimer />
    </MainWrapper>
  );
}
