import styled, { css, keyframes } from 'styled-components';

interface ProgressProps {
  at: number;
}

interface FooterProps {
  empty: boolean;
}

interface ContainerProps {
  isCollapsed: boolean;
}

const load = keyframes`
  0% { opacity: 0 }
  100% { opacity: 1 }
`;

const unLoad = keyframes`
  0% { opacity: 1 }
  100% { opacity: 0 }
`;

export const Container = styled.div<ContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 3rem 4rem;

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

  transition: width 0.4s;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    animation-delay: 0.4s;

    width: 100%;
    height: 100%;
  }

  ${(props) =>
    props.isCollapsed
      ? css`
          .content {
            animation: ${unLoad} 0.4s;
            opacity: 0;
          }
          width: 6rem;
        `
      : css`
          .content {
            animation: ${load} 0.4s;
            opacity: 1;
          }
          width: 25.6rem;
        `}
`;

export const CollapseButton = styled.div<ContainerProps>`
  position: absolute;
  display: flex;

  width: 36px;
  height: 36px;
  border-radius: 18px;
  background: var(--green-500);

  justify-content: center;
  align-items: center;

  top: 4rem;
  left: -1rem;

  color: var(--white);
  transition: transform 0.2s, filter 0.2s;

  ${(props) =>
    props.isCollapsed
      ? css`
          transform: rotate(-180deg);
          &:hover {
            cursor: pointer;
            filter: brightness(0.9);
            transform: scale(1.2) rotate(-180deg);
          }
        `
      : css`
          &:hover {
            cursor: pointer;
            filter: brightness(0.9);
            transform: scale(1.2);
          }
        `}
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

export const CurrentEpisode = styled.div`
  text-align: center;
  img {
    border-radius: 1.5rem;
  }

  strong {
    display: block;
    margin-top: 2rem;
    font: 600 1.25rem Lexend, sans-serif;
    line-height: 1.75rem;
  }

  span {
    display: block;
    margin-top: 1rem;
    opacity: 0.6;
    line-height: 1.5rem;
  }
`;

export const Footer = styled.footer<FooterProps>`
  ${(props) =>
    props.empty &&
    css`
      opacity: 0.5;
    `}
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

    &:disabled {
      cursor: default;
    }

    transition: 0.2s;

    &:hover:not(:disabled) {
      opacity: 0.6;
    }
  }
`;
