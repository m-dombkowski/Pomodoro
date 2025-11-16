import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPause, faPlay, faRepeat } from "@fortawesome/free-solid-svg-icons";
import {
  killInterval,
  manageCountDown,
  useTimer,
  useTimerDispatch,
} from "../../stores/TimerStore";

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

  const startCountdownHandler = () => {
    if (currentTimer <= 0) return;
    dispatch({
      type: "START_TIMER",
      startTime: startTime ?? currentTimer,
    });

    manageCountDown(currentTimer, dispatch, true);
  };

  const stopCountdownHandler = () => {
    dispatch({
      type: "STOP_TIMER",
      stopTime: currentTimer,
    });
    killInterval();
  };

  const resetCountdownHandler = () => {
    killInterval();
    dispatch({ type: "RESET_TIMER" });
    dispatch({
      type: "UPDATE_TIMER",
      currentTimer: startTime ?? currentTimer,
      startTime: startTime ?? currentTimer,
    });
  };

  return (
    <Wrapper>
      <ControlButton
        $disabled={isRunning || currentTimer <= 0}
        onClick={startCountdownHandler}>
        <FontAwesomeIcon icon={faPlay} />
      </ControlButton>
      <ControlButton onClick={stopCountdownHandler}>
        <FontAwesomeIcon icon={faPause} />
      </ControlButton>
      <ControlButton onClick={resetCountdownHandler}>
        <FontAwesomeIcon icon={faRepeat} />
      </ControlButton>
    </Wrapper>
  );
}
