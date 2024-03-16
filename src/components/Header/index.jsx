import { Container, Menu, Brand, Logout } from "./styles";
import { FiMenu, FiLogOut } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Search } from "../../components/Search";
import { Button } from "../../components/Button";
import brand from "../../assets/brand.svg";
import adminNameLogo from "../../assets/adminNameLogo.svg";
import brandMobile from "../../assets/brand-mobile.svg";

export function Header({ isAdmin, isDisabled, isMenuOpen, setIsMenuOpen, setSearch }) {
  const inPc = useMediaQuery({ minWidth: 1024 });
  const logo = isAdmin ? (inPc ? adminNameLogo : brandMobile) : brand;
  
  const { signOut } = useAuth();
  const navigate = useNavigate();

  function handleFavorites() {
    navigate("/favorites");
  }

  function handleNew() {
    navigate("/new");
  }

  function handleSignOut() {
    navigate("/");
    signOut();
  }

  return (
    <Container>
      {!inPc && (
        <Menu>
          {!isMenuOpen ?
            <FiMenu className="icon-menu" onClick={() => setIsMenuOpen(true)} /> :
            <>
              <MdClose size={"1.8rem"} onClick={() => setIsMenuOpen(false)} />
              <span>Menu</span>
            </>
          }
        </Menu>
      )}

      {(inPc || !isMenuOpen) && (
        <>
          <Brand>
            <img src={logo} alt="Logo" />
          </Brand>

          {inPc && <Search isDisabled={isDisabled} setSearch={setSearch} />}

          {inPc &&
            <button className="button-fav" onClick={handleFavorites}>Meus favoritos</button>
          }

          {isAdmin ? 
            (inPc && <Button className="new" title="Novo prato" onClick={handleNew} />) :
            <Button className="btn-order" title={inPc ? "Pedidos" : undefined} isCustomer  />
          }

          {inPc &&
            <Logout onClick={handleSignOut}>
              <FiLogOut size={"3.2rem"} />
            </Logout>
          }
        </>
      )}
    </Container>
  );
}
