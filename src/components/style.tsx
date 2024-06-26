import styled from "styled-components";

export const TextWrapper = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
  @media (max-width: 1024px) {
    width: 100%;
    padding: 0;
    justify-content: flex-start;
    align-items: center;
    height: auto;
  }
`;

export const ModelWrapper = styled.div`
  width: 50%;
  height: 100%;
  padding: 0 2rem;
  @media (max-width: 1024px) {
    width: 100%;
    max-height: 50%;
    padding: 0;
  }
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
`;

export const Description = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
`;

export const CursorWrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
`;

const BaseCursorButton = styled.button`
  font-size: 2rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const CursorButtonRight = styled(BaseCursorButton)`
  justify-content: flex-end;
`;

export const CursorButtonLeft = styled(BaseCursorButton)`
  justify-content: flex-start;
`;

export const NumberButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: transparent;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
