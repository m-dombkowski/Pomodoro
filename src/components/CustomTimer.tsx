import { useState } from "react";
import styled from "styled-components";
import { useTimer, useTimerDispatch } from "../stores/TimerStore";

const Input = styled.input<{ $primary?: boolean }>`
  padding: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function CustomTimer() {
  const [timeValue, setTimeValue] = useState<number | null>(0);
  const context = useTimer();
  const dispatch = useTimerDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target.valueAsNumber / 1000); // Convert milliseconds to seconds
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_CURRENT_TIMER", currentTimer: timeValue ?? 0 });
    console.log(context.currentTimer);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Type time value "
        type="time"
        onChange={handleChange}
      />
      <Input placeholder="submit " type="submit" />
    </Form>
  );
}
