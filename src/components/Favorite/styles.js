import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  padding: 1.6rem 0;

  > img {
    width: 7rem;
    height: fit-content;
  }

  > div {
    h2 {
      font-family: "Poppins", sans-serif;
      font-weight: 500;
      line-height: 150%;
      font-size: 2rem;

      color: ${({ theme }) => theme.COLORS.GRAY_200};
    }

    button {
      border: 0;
      background: none;

      font-size: 1.2rem;
      line-height: 150%;

      color: ${({ theme }) => theme.COLORS.RED_200};
    }
  }

  @media (min-width: 1024px) {
    width: 23.1rem;
  }
`;
