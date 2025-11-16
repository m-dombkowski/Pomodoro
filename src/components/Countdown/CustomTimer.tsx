import { useState } from "react";
import styled from "styled-components";
import { killInterval, useTimerDispatch } from "../../stores/TimerStore";

const Input = styled.input<{ $primary?: boolean }>`
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function CustomTimer() {
  const [timeValue, setTimeValue] = useState<number | null>(0);
  const dispatch = useTimerDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.valueAsNumber / 1000); // Convert milliseconds to seconds
  };

  const setCustomTimerHandler = (e: React.FormEvent) => {
    e.preventDefault();
    killInterval();
    dispatch({
      type: "RESET_TIMER",
    });
    dispatch({
      type: "UPDATE_TIMER",
      currentTimer: timeValue ?? 0,
      startTime: timeValue ?? 0,
    });
  };
  return (
    <Form onSubmit={setCustomTimerHandler}>
      <Input
        placeholder="Type time value "
        type="time"
        onChange={handleChange}
      />
      <Input placeholder="submit " type="submit" />
    </Form>
  );
}
