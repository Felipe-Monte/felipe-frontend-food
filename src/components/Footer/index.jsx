import { Container, ContainerLogo, Span } from "./styles";

import logo from "../../assets/footer-logo.svg";

export function Footer() {
  return (
    <Container>
      <ContainerLogo>
        <img src={logo} alt="Logo" />
      </ContainerLogo>

      <Span>
        © 2023 - Todos os direitos reservados.
      </Span>
    </Container>
  );
}