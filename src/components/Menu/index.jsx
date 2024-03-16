import { Container } from "./styles";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Header } from '../../components/Header';
import { Search } from "../Search";
import { ButtonOption } from "../ButtonOption";

export function Menu({ isAdmin, isMenuOpen, setIsMenuOpen, setSearch, isDisabled }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleNew() {
    navigate("/new");
  }

  function handleFavorites() {
    navigate("/favorites");
  }

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  return (
    <Container isMenuOpen={isMenuOpen}>
      <Header isAdmin={isAdmin} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main>
        <Search isDisabled={isDisabled} setSearch={setSearch} />

        {isAdmin ? (
          <ButtonOption onClick={handleNew}>
            Novo prato
          </ButtonOption>
        ) : null}

        <ButtonOption onClick={handleFavorites}>
          Meus favoritos
        </ButtonOption>

        <ButtonOption onClick={handleSignOut}>
          Sair
        </ButtonOption>
      </main>
    </Container>
  );
}
