import { useState } from "react";
import style from "./filterButton.module.css";
import FilterListPerformer from "../filterListPerformer/filterListPerformer";
import FilterListYear from "../filterListYear/filterListYear";
import FilterListGenre from "../filerListGenre/filterListGenre";

function FilterButton() {
  const [filter, setFilter] = useState(0);
  const toggleFilter = (id) => setFilter(filter === id ? 0 : id);

  const handleKeyDown = (numb) => toggleFilter(numb);

  return (
    <div className={style.centerBlock__filter}>
      <div className={style.filter__title}>Искать по:</div>
      <div className={style.filter__box}>
        <div>
          <div
            onClick={() => toggleFilter(1)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) =>
              handleKeyDown(event.key === "Enter" ? 1 : null)
            }
            className={
              filter === 1 ? style.filter__buttonActive : style.filter__button
            }
          >
            исполнителю
          </div>
          {filter === 1 ? <FilterListPerformer /> : null}
        </div>
        <div>
          <div
            onClick={() => toggleFilter(2)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) =>
              handleKeyDown(event.key === "Enter" ? 2 : null)
            }
            className={
              filter === 2 ? style.filter__buttonActive : style.filter__button
            }
          >
            году выпуска
          </div>
          {filter === 2 ? <FilterListYear /> : null}
        </div>
        <div>
          <div
            onClick={() => toggleFilter(3)}
            role="button"
            tabIndex={0}
            onKeyDown={(event) =>
              handleKeyDown(event.key === "Enter" ? 3 : null)
            }
            className={
              filter === 3 ? style.filter__buttonActive : style.filter__button
            }
          >
            жанру
          </div>
          {filter === 3 ? <FilterListGenre /> : null}
        </div>
      </div>
    </div>
  );
}

export default FilterButton;
