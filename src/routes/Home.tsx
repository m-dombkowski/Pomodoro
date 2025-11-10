import styled from "styled-components";
import CustomTimer from "../components/CustomTimer";
import { useTimer } from "../stores/TimerStore";
import SetTimer from "../components/SetTimer";
import Controls from "../components/Controls";

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333;
`;

const SetTimers = [
  { InputName: "Pomodoro", TimerValue: 1500 }, // 25 minutes
  { InputName: "Short", TimerValue: 300 }, // 5 minutes
  { InputName: "Long", TimerValue: 900 }, // 15 minutes
];

export default function Home() {
  const context = useTimer();

  return (
    <MainWrapper>
      <Title>Home</Title>
      <Title>{context.currentTimer}</Title>
      <Controls />
      <InnerWrapper>
        <CustomTimer />

        {SetTimers.map(({ InputName, TimerValue }) => (
          <SetTimer
            key={InputName}
            InputName={InputName}
            TimerValue={TimerValue}
          />
        ))}
      </InnerWrapper>
    </MainWrapper>
  );
}
