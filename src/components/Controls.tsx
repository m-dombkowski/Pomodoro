import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPause, faPlay, faRepeat } from "@fortawesome/free-solid-svg-icons";
import {
  manageCountDown,
  useTimer,
  useTimerDispatch,
} from "../stores/TimerStore";

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
  const context = useTimer();

  const handleStart = () => {
    dispatch({
      type: "START_TIMER",
      startTime: context.startTime ?? context.currentTimer,
    });

    manageCountDown(context.currentTimer, dispatch, true);
  };

  const handleStop = () => {
    dispatch({
      type: "STOP_TIMER",
      stopTime: context.currentTimer,
    });
    manageCountDown(context.currentTimer, dispatch, false);
  };

  return (
    <Wrapper>
      <ControlButton $disabled={context.isRunning} onClick={handleStart}>
        <FontAwesomeIcon icon={faPlay} />
      </ControlButton>
      <ControlButton onClick={handleStop}>
        <FontAwesomeIcon icon={faPause} />
      </ControlButton>
      <ControlButton>
        <FontAwesomeIcon icon={faRepeat} />
      </ControlButton>
    </Wrapper>
  );
}
