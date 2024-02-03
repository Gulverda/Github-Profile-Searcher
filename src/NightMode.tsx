// NightMode.tsx
import React from "react";
import styled from "styled-components";

interface NightModeProps {
  nightMode: boolean;
  toggleNightMode: () => void;
}

const NightModeToggle = styled.div`
  top: 20px;
  right: 20px;
  cursor: pointer;
  font-size: 20px;
  color: #4b6a9b;
`;

const NightMode: React.FC<NightModeProps> = ({ nightMode, toggleNightMode }) => {
  return (
    <NightModeToggle onClick={toggleNightMode}>
      {nightMode ? "🌙" : "☀️"}
    </NightModeToggle>
  );
};

export default NightMode;
