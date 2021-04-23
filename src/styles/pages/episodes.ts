import styled from 'styled-components';

export const Container = styled.div`
  max-width: 45rem;
  padding: 3rem 2rem;

  margin: 0 auto;
`;

export const ThumbContainer = styled.div`
  position: relative;

  img {
    border-radius: 1rem;
  }

  button {
    position: absolute;

    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    border: 0;

    z-index: 5;

    font-size: 0;

    img {
      transition: transform 0.2s;
    }

    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.9);
      img {
        transform: scale(1.2);
      }
    }

    &:first-child {
      left: 0;
      top: 50%;
      background: var(--purple-500);
      transform: translate(-50%, -50%);
    }

    &:last-child {
      right: 0;
      top: 50%;
      background: var(--green-500);
      transform: translate(50%, -50%);
    }
  }
`;

export const Header = styled.header`
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--gray-100);

  h1 {
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  span {
    display: inline-block;
    font-size: 0.875rem;

    & + span {
      position: relative;
      margin-left: 1rem;
      padding-left: 1rem;

      &::before {
        content: '';
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background: #ddd;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
`;

export const EpisodeDescription = styled.div`
  margin-top: 2rem;
  line-height: 1.675rem;
  color: var(--gray-800);

  p {
    margin: 1.5rem 0;
  }
`;