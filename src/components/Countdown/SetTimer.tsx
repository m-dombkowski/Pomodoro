import styled from "styled-components";
import { killInterval, useTimerDispatch } from "../../stores/TimerStore";

const Input = styled.input`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export default function SetTimer({
  InputName,
  TimerValue,
}: {
  InputName: string;
  TimerValue: number;
}) {
  const dispatch = useTimerDispatch();

  const setTimer = () => {
    killInterval();
    dispatch({
      type: "RESET_TIMER",
    });
    dispatch({
      type: "UPDATE_TIMER",
      currentTimer: TimerValue,
      startTime: TimerValue,
    });
  };

  return <Input onClick={setTimer} defaultValue={InputName} />;
}
