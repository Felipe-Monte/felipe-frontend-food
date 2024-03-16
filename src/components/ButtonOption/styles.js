import styled from "styled-components";

export const Container = styled.button`
  color: ${({ theme }) => theme.COLORS.GRAY_200};
  border: none;
  background: none;

  font-family: "Poppins", sans-serif;
  line-height: 140%;
  font-size: 2.4rem;
  font-weight: 500;

  display: flex;
  align-items: center;

  > svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.COLORS.WHITE};
  }

  @media (min-width: 1024px) {
    font-weight: 700;
  }
`;
