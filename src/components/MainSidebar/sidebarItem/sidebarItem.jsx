import { Link } from "react-router-dom";
import style from "./sidebarItem.module.css";

function SidebarItem({ select, playList }) {
  return (
    <div className={style.sidebar__item}>
      <Link to={`/category/${select}`} className={style.sidebar__link}>
        <img
          className={style.sidebar__img}
          src={playList}
          alt="day's playlist"
        />
      </Link>
    </div>
  );
}

export default SidebarItem;
