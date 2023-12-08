import style from "./filterListPerformer.module.css";

function FilterListPerformer() {
  return (
    <div className={style.filterList}>
      <ul className={style.filterList__performer}>
        <li className={style.filterList__text}>Michael Jackson</li>
        <li className={style.filterList__text}>Frank Sinatra</li>
        <li className={style.filterList__text}>Calvin Harris</li>
        <li className={style.filterList__text}>Zhu</li>
        <li className={style.filterList__text}>Arctic Monkeys</li>
      </ul>
    </div>
  );
}

export default FilterListPerformer;
