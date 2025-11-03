import styled from "styled-components";

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

const TextInput = styled.input<{ $primary?: boolean }>`
  padding: 10px;
`;

export default function Home() {
  return (
    <MainWrapper>
      <Title>Home</Title>
      <TextInput placeholder="Type time value " type="text" />
    </MainWrapper>
  );
}
