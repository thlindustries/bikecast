import styled, { css } from 'styled-components';

interface ProgressProps {
  at: number;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 3rem 4rem;
  width: 25.6rem;
  height: 100vh;

  background: var(--purple-500);
  color: var(--white);

  header {
    display: flex;
    align-items: center;

    gap: 1rem;
  }

  strong {
    font-family: Lexend, sans-serif;
    font-weight: 600;
  }

  footer {
    align-self: stretch;
  }
`;

export const EmptyPlayer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 20rem;

  border: 1.5px dashed var(--purple-300);
  border-radius: 1.5rem;
  background: linear-gradient(
    143.8deg,
    rgba(145, 100, 250, 0.8) 0%,
    rgba(0, 0, 0, 0) 100%
  );

  padding: 4rem;
  text-align: center;
`;

export const Progress = styled.div<ProgressProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size-adjust: 0.875rem;

  ${(props) =>
    props.at === 0 &&
    css`
      opacity: 0.5;
    `}

  span {
    display: inline-block;
    width: 4rem;

    text-align: center;
  }
`;

export const SliderWrapper = styled.div`
  flex: 1;

  .slider {
    width: 100%;
    height: 4px;

    background: var(--purple-300);

    border-radius: 2px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 2.5rem;
  gap: 1.5rem;

  button {
    background: transparent;
    border: 0;
    font-size: 0;

    &.play-button {
      width: 4rem;
      height: 4rem;

      border-radius: 1rem;
      background: var(--purple-400);
    }

    transition: 0.2s;
    &:hover {
      opacity: 0.6;
    }
  }
`;
