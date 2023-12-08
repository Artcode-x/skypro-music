import style from "./navLogo.module.css";
import logo from "../../../img/logo-white.png";

function NavLogo() {
  return (
    <div className={style.nav__logo}>
      <img className={style.nav__image} src={logo} alt="logo" />
    </div>
  );
}

export default NavLogo
