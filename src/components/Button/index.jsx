import { Container } from "./styles";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { MdOutlineReceiptLong } from "react-icons/md";

export function Button({ title, loading = false, isCustomer, ...rest }) {
  const inPc = useMediaQuery({ minWidth: 1024 });

  return (
    <Container type="button" disabled={loading} {...rest}>
      {isCustomer && <MdOutlineReceiptLong size={"3.0rem"} />}
      {loading ? "Carregando..." : title}
    </Container>
  );
}
