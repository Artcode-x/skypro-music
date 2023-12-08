import style from "./filterListGenre.module.css";

function FilterListGenre() {
  return (
    <div className={style.filterList}>
      <ul className={style.filterList__Genre}>
        <li className={style.filterList__text}>Рок</li>
        <li className={style.filterList__text}>Хип-хоп</li>
        <li className={style.filterList__text}>Поп-музыка</li>
        <li className={style.filterList__text}>Техно</li>
        <li className={style.filterList__text}>Инди</li>
      </ul>
    </div>
  );
}

export default FilterListGenre;
