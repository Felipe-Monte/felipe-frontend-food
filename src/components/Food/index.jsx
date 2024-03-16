import { Container, Text, Buttons } from "./styles";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { PiPencilSimpleThin } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import theme from "../../styles/theme";
import { api } from "../../services/api";
import { AddQuantity } from "../../components/AddQuantity";
import { Button } from "../../components/Button";

export function Food({
  data,
  isAdmin,
  isFavorite,
  updateFavorite,
  handleDetails,
  user_id,
  ...rest
}) {
  const inPc = useMediaQuery({ minWidth: 1024 });

  const params = useParams();
  const navigate = useNavigate();

  const [number, setNumber] = useState(1);
  const [cartId, setCartId] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFavorite = async () => {
    try {
      if (isFavorite) {
        updateFavorite(true, data.id);
      } else {
        updateFavorite(false, data.id);
      }
    } catch (error) {
      console.log("Erro ao atualizar favoritos:", error);
    }
  };

  function handleEdit() {
    navigate(`/edit/${data.id}`);
  }

  async function handleInclude() {
    setLoading(true);

    try {
      const cartItem = {
        dish_id: data.id,
        name: data.name,
        quantity: number,
      };

      const response = await api.get("/carts", {
        params: { created_by: user_id },
      });
      const cart = response.data[0];

      if (cart) {
        await api.patch(`/carts/${cart.id}`, { cart_items: [cartItem] });
      } else {
        const createResponse = await api.post("/carts", {
          cart_items: [cartItem],
          created_by: user_id,
        });
        const createdCart = createResponse.data;

        setCartId(createdCart.id);
      }

      alert("Prato adicionado ao carrinho!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível adicionar ao carrinho.");
        console.log("Erro ao adicionar ao carrinho:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container {...rest} isAdmin={isAdmin}>
      {isAdmin ? (
        <PiPencilSimpleThin size={"2.4rem"} onClick={handleEdit} />
      ) : (
        <FiHeart
          size={"2.4rem"}
          fill={isFavorite ? theme.COLORS.GRAY_200 : undefined}
          onClick={handleFavorite}
        />
      )}

      <img
        src={`${api.defaults.baseURL}/files/${data.image}`}
        alt="Imagem do prato."
        onClick={() => handleDetails(data.id)}
      />

      <Text>
        <h2>{data.name}</h2>
        <FaArrowRight
          size={inPc ? "1.5rem" : "1.4rem"}
          onClick={() => handleDetails(data.id)}
        />
      </Text>

      {inPc && <p>{data.description}</p>}
      <span>
        R$ {data.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
      </span>

      {!isAdmin && (
        <Buttons>
          <AddQuantity number={number} setNumber={setNumber} />
          <Button title="incluir" onClick={handleInclude} loading={loading} />
        </Buttons>
      )}
    </Container>
  );
}
