import { Container, Content } from "./styles";

import { useState, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";

import { api } from '../../services/api';

import { RxCaretLeft } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

import { Menu } from "../../components/Menu";
import { Header } from '../../components/Header';
import { Favorite } from '../../components/Favorite';
import { ButtonOption } from "../../components/ButtonOption";
import { Footer } from '../../components/Footer';

export function Favorites({ isAdmin }) {
  const inPc = useMediaQuery({ minWidth: 1024 });

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorites");
        setFavorites(response.data);
      } catch (error) {
        console.log("Erro ao buscar favoritos:", error);
      }
    };
  
    fetchFavorites();
  }, []);  

  const removeFavorite = async (dishId) => {
    try {
      await api.delete(`/favorites/${dishId}`);

      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== dishId)
      );
    } catch (error) {
      console.log('Erro ao atualizar favoritos:', error);
    }
  };

  return (
    <Container>
      {!inPc && 
        <Menu 
          isAdmin={isAdmin} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        />
      }

      <Header 
        isAdmin={isAdmin} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />

      {
        favorites && 
        <main>
          <div>
            <header>
              <ButtonOption onClick={handleBack}>
                <RxCaretLeft />
                voltar
              </ButtonOption>

              <h1>Meus favoritos</h1>
            </header>

            <Content>
              {
                favorites.map(favorite => (
                  <Favorite 
                    key={String(favorite.id)}
                    data={favorite}
                    removeFavorite={removeFavorite} 
                  />
                ))
              }
            </Content>
          </div>
        </main>
      }

      <Footer />
    </Container>
  );
}
