import styled from "styled-components";

export const Container = styled.button`
  border: 0;
  background: none;
  border-radius: 0.5rem;

  background-color: ${({ theme }) => theme.COLORS.RED_200};
  color: ${({ theme }) => theme.COLORS.WHITE};

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 1.2rem 2.4rem;

  font-family: "Poppins", sans-serif;
  font-size: 1.4rem;
  line-height: 2.4rem;

  position: relative;

  > span {
    position: absolute;
    right: -0.6rem;
    top: -0.4rem;

    border-radius: 100px;
    background-color: ${({ theme }) => theme.COLORS.RED_200};
  }

  &:disabled {
    opacity: 0.5;
  }

  @media (min-width: 1024px) {
    padding: 1.2rem 3.2rem;
    gap: 0.8rem;

    > span {
      padding-inline: 0;
      position: initial;
    }
  }
`;
