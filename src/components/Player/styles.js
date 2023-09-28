import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100px;
  padding: 0 25px;
  @media (orientation: portrait), (max-width: 799px) {
    grid-template-columns: 1fr;
    height: 220px;
  }
`;

export const Title = styled.h3`
  font-family: sans-serif;
  font-size: 25px;
  text-align: center;
  width: 100%;
  min-width: 150px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const InputWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 54px;
  border-radius: 27px;
  background-color: #f1f3f4;
  position: relative;
  & > input {
    position: absolute;
    inset: 0;
    border-radius: 27px;
    opacity: 0;
  }
`;
