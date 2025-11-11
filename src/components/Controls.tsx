import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPause, faPlay, faRepeat } from "@fortawesome/free-solid-svg-icons";
import {
  killInterval,
  manageCountDown,
  useTimer,
  useTimerDispatch,
} from "../stores/TimerStore";
import { useState } from "react";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 50px 0;
`;

const ControlButton = styled.button<{ $disabled?: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  ${(props) =>
    props.$disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;

export default function Controls() {
  const dispatch = useTimerDispatch();
  const { currentTimer, startTime, isRunning } = useTimer();

  const [startingTime, setStartginTime] = useState<number | null>(null);

  const handleStart = () => {
    setStartginTime(currentTimer);
    dispatch({
      type: "START_TIMER",
      startTime: startTime ?? currentTimer,
    });

    manageCountDown(currentTimer, dispatch, true);
  };

  const handleStop = () => {
    dispatch({
      type: "STOP_TIMER",
      stopTime: currentTimer,
    });
    killInterval();
    // manageCountDown(currentTimer, dispatch, false);
  };

  const handleReset = () => {
    killInterval();
    dispatch({ type: "RESET_TIMER" });
    console.log(startingTime, currentTimer);
    dispatch({
      type: "UPDATE_TIMER",
      currentTimer: startingTime ?? currentTimer,
    });
  };

  return (
    <Wrapper>
      <ControlButton $disabled={isRunning} onClick={handleStart}>
        <FontAwesomeIcon icon={faPlay} />
      </ControlButton>
      <ControlButton onClick={handleStop}>
        <FontAwesomeIcon icon={faPause} />
      </ControlButton>
      <ControlButton onClick={handleReset}>
        <FontAwesomeIcon icon={faRepeat} />
      </ControlButton>
    </Wrapper>
  );
}
