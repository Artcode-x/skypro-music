import style from "./centerBlockSearch.module.css";
import sprite from "../../../img/icon/sprite.svg";

function CenterBlockSearch() {
  return (
    <div className={style.centerBlock__search}>
      <svg className={style.search__svg} alt="search">
        <use xlinkHref={`${sprite}#icon-search`} />
      </svg>
      <input
        className={style.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
      />
    </div>
  );
}

export default CenterBlockSearch;
