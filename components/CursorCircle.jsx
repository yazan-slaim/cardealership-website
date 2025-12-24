'use client'
import styled from '@emotion/styled';
import { useCursor } from '@/contexts/CursorContext';

const CursorCircle = styled.div`
  position: fixed;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: white;
  transform: translate(-50%, -50%);
  pointer-events: none;
  mix-blend-mode: difference;
  transition: width 0.3s ease, height 0.3s ease, left 0.1s, top 0.1s;
  z-index: 9999;

  &.large {
    width: 75px;
    height: 75px;
  }
`;

export default function Cursor() {
  const { cursorSize, position } = useCursor();

  return (
    <CursorCircle
      className={cursorSize}
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    />
  );
}