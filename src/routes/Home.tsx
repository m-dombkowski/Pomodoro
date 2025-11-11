import styled from "styled-components";
import CustomTimer from "../components/Countdown/CustomTimer";
import { useTimer } from "../stores/TimerStore";
import SetTimer from "../components/Countdown/SetTimer";
import Controls from "../components/Countdown/Controls";

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
  const { currentTimer } = useTimer();

  const formatedTimeMinutes = Math.floor(currentTimer / 60)
    .toString()
    .padStart(2, "0");
  const formatedTimeSeconds = (currentTimer % 60).toString().padStart(2, "0");

  return (
    <MainWrapper>
      <Title>Home</Title>
      <Title>
        {formatedTimeMinutes}:{formatedTimeSeconds}{" "}
      </Title>
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
