import styled from 'styled-components';

export const Container = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

export const Cnv = styled.canvas`
  position: absolute;
  inset: 0;
`;

export const Select = styled.select`
  width: 280px;
  height: 40px;
  border: 1px solid #000;
  border-radius: 10px;
  font-family: sans-serif;
  font-size: 20px;
  color: var(--color-black);
  padding: 0 20px;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  z-index: 1;
  margin: 10px 25px;
`;

const trackStyle = `
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: var(--color-black);
  border-radius: 1px;
`;

export const Input = styled.input`
  width: 280px;
  z-index: 1;
  margin: 10px 25px;
  &::-webkit-slider-runnable-track {
    ${trackStyle}
  }
  &::-webkit-slider-thumb {
    transform: translateY(-7px);
  }
  &::-moz-range-track {
    ${trackStyle}
  }
  &::-ms-track {
    ${trackStyle}
  }
`;
