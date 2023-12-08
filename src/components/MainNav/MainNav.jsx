import { useState } from "react";
import style from "./MainNav.module.css";
import NavLogo from "./navLogo/navLogo";
import NavMenu from "./navMenu/navMenu";
import NavBurger from "./navBurger/navBurger";

function MainNav() {
  const [visible, setVisible] = useState(true);

  const toggleVisibility = () => setVisible(!visible);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      toggleVisibility();
    }
  };

  return (
    <nav className={style.main__nav}>
      <NavLogo />
      <NavBurger
        toggleVisibility={toggleVisibility}
        handleKeyDown={handleKeyDown}
      />
      {visible && <NavMenu />}
    </nav>
  );
}

export default MainNav;
