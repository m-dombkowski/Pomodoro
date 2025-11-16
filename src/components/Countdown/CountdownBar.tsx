import styled from "styled-components";
import { useTimer } from "../../stores/TimerStore";
import { useEffect, useState } from "react";

const Bar = styled.div`
  width: 300px;
  height: 20px;
  border: 1px solid #000;
`;

const BarFill = styled.div<{ $width: number }>`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.$width}%;
  transition: width 0.5s ease;
`;

export default function CountdownBar() {
  const { elapsedTime, startTime, currentTimer } = useTimer();

  const [barFill, setBarFill] = useState<number>(0);

  useEffect(() => {
    setBarFill(startTime && elapsedTime ? (elapsedTime * 100) / startTime : 0);

    console.log(
      "Elapsed Time:",
      elapsedTime,
      "Start Time:",
      startTime,
      "Current Timer:",
      currentTimer
    );
  }, [elapsedTime, startTime, currentTimer]);

  useEffect(() => {}, []);
  return (
    <Bar>
      <BarFill $width={barFill} />
    </Bar>
  );
}

//  25min = 1500s
// minelo 3min = 180s
// (180/1500) * 100 = 12%
// 180 - x
// 1500 - 100
// x = (180 * 100) / 1500

// barFillWidth.current = startTime
//   ? Math.ceil((elapsedTime * 100) / startTime)
//   : 0;
// console.log(
//   "Elapsed Time:",
//   elapsedTime,
//   "Start Time:",
//   startTime,
//   "Current Timer:",
//   currentTimer
// );
