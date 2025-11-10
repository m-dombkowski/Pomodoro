import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPause, faPlay, faRepeat } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
  margin: 50px 0;
`;

const ControlButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
`;

export default function Controls() {
  return (
    <Wrapper>
      <ControlButton>
        <FontAwesomeIcon icon={faPlay} />
      </ControlButton>
      <ControlButton>
        <FontAwesomeIcon icon={faPause} />
      </ControlButton>
      <ControlButton>
        <FontAwesomeIcon icon={faRepeat} />
      </ControlButton>
    </Wrapper>
  );
}
