import { Container } from "./styles";
import { FiMinus, FiPlus } from "react-icons/fi";

export function AddQuantity({ number, setNumber }) {
  const addNumber = () => {
    setNumber(number + 1);
  };

  const removeNumber = () => {
    if (number > 1) {
      setNumber(number - 1);
    }
  };

  return (
    <Container>
      <button onClick={removeNumber}><FiMinus /></button>
      <span>{number < 10 ? `0${number}` : number}</span>
      <button onClick={addNumber}><FiPlus /></button>
    </Container>
  );
}
