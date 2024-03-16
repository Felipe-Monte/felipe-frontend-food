import { Container, Content } from "./styles";

import { api } from '../../services/api';

import { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Menu } from "../../components/Menu";
import { Section } from '../../components/Section';
import { Food } from "../../components/Food";
import { Footer } from '../../components/Footer';

import bannerSmall from "../../assets/banner-small.png";
import home from "../../assets/home.png";

import { register } from 'swiper/element/bundle';

register();

export function Home({ isAdmin, user_id }) {
  const swiper_1 = useRef(null);
  const swiper_2 = useRef(null);
  const swiper_3 = useRef(null);

  const inPc = useMediaQuery({ minWidth: 1024 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.swiper && entry.target.swiper.autoplay.start();
        } else {
          entry.target.swiper && entry.target.swiper.autoplay.stop();
        }        
      });
    }, options);

    observer.observe(swiper_1.current);
    observer.observe(swiper_2.current);
    observer.observe(swiper_3.current);

    return () => {
      observer.disconnect();
    }
  }, []);

  const [dishes, setDishes] = useState({ meals: [], desserts: [], beverages: [] });
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  function handleDetails(id) {
    navigate(`/dish/${id}`);
  }

  useEffect(() => {
    async function fetchDishes() {
      const response = await api.get(`/dishes?search=${search}`);
      const meals = response.data.filter(dish => dish.category === "meal");
      const desserts = response.data.filter(dish => dish.category === "dessert");
      const beverages = response.data.filter(dish => dish.category === "beverage");

      setDishes({ meals, desserts, beverages });
    }

    fetchDishes();
  }, [search]);

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get("/favorites");
        const favorites = response.data.map((favorite) => favorite.dish_id);

        setFavorites(favorites);
      } catch (error) {
        console.log("Erro ao buscar favoritos:", error);
      }
    };

    fetchFavorites();
  }, []);

  const updateFavorite = async (isFavorite, dishId) => {
    try {
      if (isFavorite) {
        await api.delete(`/favorites/${dishId}`);

        setFavorites((prevFavorites) =>
          prevFavorites.filter((favorite) => favorite !== dishId)
        );
      } else {
        await api.post('/favorites', { dish_id: dishId });
        setFavorites((prevFavorites) => [...prevFavorites, dishId]);
      }
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
          setSearch={setSearch}
        />
      }

      <Header 
        isAdmin={isAdmin} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        setSearch={setSearch}
      />

      <main>
        <div>
          <header>
            <img 
              src={inPc ? home : bannerSmall} 
              alt="Macarons coloridos em tons pastel despencando juntamente com folhas verdes e frutas frescas." 
            />
          
            <div>
              <h1>Sabores inigualáveis</h1>
              <p>Sinta o cuidado do preparo com ingredientes selecionados</p>
            </div>
          </header>

          <Content>
            <Section title="Refeições">
              <swiper-container
                key={inPc}
                ref={swiper_1}
                space-between={inPc ? "27" : "16"}
                slides-per-view="auto"
                navigation={inPc ? "true" : "false"}
                loop="false"
                grab-cursor="true"
              >
                {
                  dishes.meals.map(dish => (
                    <swiper-slide key={String(dish.id)}>
                      <Food 
                        isAdmin={isAdmin}
                        data={dish}
                        isFavorite={favorites.includes(dish.id)}
                        updateFavorite={updateFavorite} 
                        user_id={user_id}
                        handleDetails={handleDetails}
                      />
                    </swiper-slide>
                  ))
                }
              </swiper-container>
            </Section>

            <Section title="Sobremesas">
              <swiper-container
                key={inPc}
                ref={swiper_2}
                space-between={inPc ? "27" : "16"}
                slides-per-view="auto"
                navigation={inPc ? "true" : "false"}
                loop="false"
                grab-cursor="true"
              >
                {
                  dishes.desserts.map(dish => (
                    <swiper-slide key={String(dish.id)}>
                      <Food 
                        isAdmin={isAdmin}
                        data={dish}
                        isFavorite={favorites.includes(dish.id)}
                        updateFavorite={updateFavorite} 
                        user_id={user_id}
                        handleDetails={handleDetails}
                      />
                    </swiper-slide>
                  ))
                }
              </swiper-container>
            </Section>

            <Section title="Bebidas">
              <swiper-container
                key={inPc}
                ref={swiper_3}
                space-between={inPc ? "27" : "16"}
                slides-per-view="auto"
                navigation={inPc ? "true" : "false"}
                loop="false"
                grab-cursor="true"
              >
                {
                  dishes.beverages.map(dish => (
                    <swiper-slide key={String(dish.id)}>
                      <Food 
                        isAdmin={isAdmin}
                        data={dish} 
                        isFavorite={favorites.includes(dish.id)}
                        updateFavorite={updateFavorite}
                        user_id={user_id}
                        handleDetails={handleDetails}
                      />
                    </swiper-slide>
                  ))
                }
              </swiper-container>
            </Section>
          </Content>
        </div>
      </main>

      <Footer />
    </Container>
  );
}