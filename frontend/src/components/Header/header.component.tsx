import { useLinks } from "@hooks/useLinks";
import { NavLink } from "react-router-dom";
import { Logo } from "@assets/img";
import cn from "classnames";
import style from "./header.module.scss";
import {
  FavoriteBorder,
  PersonOutline,
  Search,
  ShoppingCartOutlined,
} from "@mui/icons-material";

export const Header = () => {
  const { headerLinks } = useLinks();

  return (
    <header className={style.menu}>
      <div className={style.menuWrapper}>
        <h1 className={style.logo}>
          <img src={Logo} alt="Logo da Furniro" />
          <p>Furniro</p>
        </h1>
        <nav className={style.menuNav}>
          {headerLinks.map((link) => (
            <NavLink
              className={({ isActive }) =>
                cn(style.link, { [style.activeLink]: isActive })
              }
              key={link.label}
              to={link.route}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <ul className={style.menuButtons}>
          <PersonOutline />
          <Search />
          <FavoriteBorder />
          <ShoppingCartOutlined />
        </ul>
      </div>
    </header>
  );
};
