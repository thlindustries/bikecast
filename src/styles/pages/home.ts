import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 4rem;
  height: calc(100vh - 6.5rem);
  overflow-y: auto;

  h2 {
    margin-top: 3rem;
    margin-bottom: 1.5rem;
  }
`;

export const LatestEpisodes = styled.section`
  ul {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  li {
    display: flex;
    align-items: center;

    background: var(--white);
    border: 1px solid var(--gray);
    padding: 1.25rem;
    border-radius: 1.5rem;
    position: relative;

    img {
      width: 6rem;
      height: 6rem;

      border-radius: 1rem;
    }
  }
  button {
    position: absolute;
    right: 2rem;
    bottom: 2rem;

    width: 2.5rem;
    height: 2.5rem;
    background: var(--white);
    border: 1px solid var(--gray-100);
    border-radius: 0.675rem;
    font-size: 0;

    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    svg {
      color: var(--green-500);
    }

    img,
    svg {
      transition: transform 0.2s;
    }

    transition: filter 0.2s;
    &:hover {
      filter: brightness(0.95);
      img,
      svg {
        transform: scale(1.2);
      }
    }
  }
`;

export const AllEpisodes = styled.section`
  padding-bottom: 2rem;

  table {
    width: 100%;

    th,
    td {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--gray-100);
    }

    th {
      color: var(--gray-200);
      text-transform: uppercase;
      font: 500 0.75rem Lexend, sans-serif;
      text-align: left;
    }

    td {
      font-size: 0.875rem;

      img {
        width: 2.5rem;
        height: 2.5rem;

        border-radius: 0.5rem;
      }

      .episode-title-link {
        color: var(--gray-800);
        font-family: Lexend, sans-serif;
        font-weight: 600;
        text-decoration: none;
        line-height: 1.4rem;
        font-size: 1rem;

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }

      button {
        width: 2rem;
        height: 2rem;
        background: var(--white);
        border: 1px solid var(--gray-100);
        border-radius: 0.5rem;
        font-size: 0;

        img {
          width: 1.25rem;
          height: 1.5rem;
        }
        svg {
          color: var(--green-500);
        }

        img,
        svg {
          transition: transform 0.2s;
        }

        transition: filter 0.2s;
        &:hover {
          filter: brightness(0.95);
          img,
          svg {
            transform: scale(1.2);
          }
        }
      }
    }
  }
`;

export const EpisodeDetails = styled.div`
  flex: 1;
  margin-left: 1rem;

  .episode-title-link {
    display: block;
    color: var(--gray-800);
    font-family: Lexend, sans-serif;
    font-weight: 600;
    text-decoration: none;
    line-height: 1.4rem;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  p {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    max-width: 78%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    display: inline-block;
    margin-top: 0.5rem;
    font-size: 0.875rem;

    &:last-child {
      margin-left: 0.5rem;
      padding-left: 0.5rem;
      position: relative;

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
