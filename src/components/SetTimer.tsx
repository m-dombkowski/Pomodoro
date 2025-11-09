import styled from "styled-components";
import { useTimerDispatch } from "../stores/TimerStore";

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
    dispatch({ type: "SET_CURRENT_TIMER", currentTimer: TimerValue });
  };

  return <Input onClick={setTimer} value={InputName} />;
}
