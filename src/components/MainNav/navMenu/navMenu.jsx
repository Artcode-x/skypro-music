import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPlayTrack, addUser } from "../../../store/actions/creators/creators";
import S from "./navMenu.module.css";

function NavMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exit = () => {
    dispatch(addUser(null));
    dispatch(addPlayTrack({}));
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={S.nav__menu}>
      <ul className={S.menu__list}>
        <li className={S.menu__item}>
          <Link to="/" className={S.menu__link}>
            Главное
          </Link>
        </li>
        <li className={S.menu__item}>
          <Link to="/favorites" className={S.menu__link}>
            Мой плейлист
          </Link>
        </li>
        <li className={S.menu__item}>
          <button type="button" onClick={exit} className={S.menu__link}>
            Выйти
          </button>
        </li>
      </ul>
    </div>
  );
}

export default NavMenu;
