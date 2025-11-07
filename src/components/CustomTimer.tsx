import { useState } from "react";
import styled from "styled-components";

const Input = styled.input<{ $primary?: boolean }>`
  padding: 10px;
`;

export default function CustomTimer() {
  const [timeValue, setTimeValue] = useState<number | null>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(e.target?.value ? parseInt(e.target.value) : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted time value:", timeValue);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Type time value "
        type="text"
        onChange={handleChange}
      />
      <Input placeholder="submit " type="submit" />
    </form>
  );
}
