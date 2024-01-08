import style from "./centerBlockSearch.module.css"
import sprite from "../../../img/icon/sprite.svg"
import { useDispatch } from "react-redux"
// import { searchSelector } from "../../../store/selectors/selectors"
import { addSearchUpdate } from "../../../store/actions/creators/creators"

function CenterBlockSearch() {
  const dispatch = useDispatch()

  const setSearchType = (e) => {
    // dispatch(searchSelector(e))
    dispatch(addSearchUpdate(e))
  }

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
        onChange={(e) => setSearchType(e.target.value)}
      />
    </div>
  )
}

export default CenterBlockSearch
