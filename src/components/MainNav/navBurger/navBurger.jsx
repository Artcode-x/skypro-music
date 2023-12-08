import style from "./navBurger.module.css";

function NavBurger({ toggleVisibility, handleKeyDown }) {
  return (
    <div
      onClick={toggleVisibility}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className={style.nav__burger}
    >
      <span className={style.nav__line} />
      <span className={style.nav__line} />
      <span className={style.nav__line} />
    </div>
  );
}

export default NavBurger;
