import { Container } from "./styles";

export function ButtonOption({ children, ...rest }) {
  return (
    <Container type="button" {...rest}>
      {children}
    </Container>
  );
}
