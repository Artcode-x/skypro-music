import { useEffect, useState } from "react"
import style from "./filterButton.module.css"
import ystyle from "../filterListYear/filterListYear.module.css"
// import FilterListYear from "../filterListYear/filterListYear"

import { useDispatch, useSelector } from "react-redux"
import allTracksSelector, {
  filteredTracksSelector,
} from "../../../store/selectors/selectors"
import styled from "../filterListPerformer/filterListPerformer.module.css"
import {
  setArrayFilteredTracks,
  setFilteredTracks,
} from "../../../store/actions/creators/creators"
import xstyle from "../filerListGenre/filterListGenre.module.css"

function FilterButton() {
  const dispatch = useDispatch()

  // const isFiltered = useSelector(filteredTracksSelector)

  const allTracks = useSelector(allTracksSelector)

  const [filterAuthor, setFilterAuthor] = useState("")
  const [filterGenre, setFilterGenre] = useState("")
  const [filterYear, setFilterYear] = useState("")

  const [filter, setFilter] = useState(0)
  const toggleFilter = (id) => {
    setFilter(filter === id ? 0 : id)
  }

  const handleKeyDown = (numb) => toggleFilter(numb)

  const handleClickFilter = (e) => {
    setFilterAuthor(e.target.textContent)

    const filteredAuthor = allTracks.filter(
      (track) => track.author === e.target.textContent
    )

    dispatch(setFilteredTracks(true))

    dispatch(setArrayFilteredTracks(filteredAuthor))
  }

  // у фильтра значения 0,1,2,3
  useEffect(() => {
    if (filter === 0) {
      dispatch(setFilteredTracks(false))
    }
  }, [filter])

  const handleClickFilterGenre = (e) => {
    setFilterGenre(e.target.textContent)
    const filterGenre = allTracks.filter(
      (track) => track.genre === e.target.textContent
    )
    dispatch(setFilteredTracks(true))
    dispatch(setArrayFilteredTracks(filterGenre))
  }

  const handleClickFilterYear = (e) => {
    setFilterYear(e.target.textContent)
    const filterYear = allTracks.filter(
      (track) => track.release_date === e.target.textContent
    )
    dispatch(setFilteredTracks(true))
    dispatch(setArrayFilteredTracks(filterYear))
  }

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
          {filter === 1 ? (
            <div className={styled.filterList}>
              <ul className={styled.filterList__performer}>
                <li
                  className={styled.filterList__text}
                  onClick={(e) => handleClickFilter(e)}
                >
                  Alexander Nakarada
                </li>
                <li
                  className={styled.filterList__text}
                  onClick={(e) => handleClickFilter(e)}
                >
                  Frank Schroter
                </li>
                <li
                  className={styled.filterList__text}
                  onClick={(e) => handleClickFilter(e)}
                >
                  Waltz Piano
                </li>
                <li
                  className={styled.filterList__text}
                  onClick={(e) => handleClickFilter(e)}
                >
                  Voisin
                </li>
                <li
                  className={styled.filterList__text}
                  onClick={(e) => handleClickFilter(e)}
                >
                  Kevin Macleodburn
                </li>
              </ul>
            </div>
          ) : null}
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
          {filter === 2 ? (
            <div className={styled.filterList}>
              <ul className={styled.filterList__performer}>
                {/* <div className={ystyle.filterList__year}> */}

                <li
                  className={ystyle.filterList__text}
                  onClick={(e) => handleClickFilterYear(e)}
                >
                  1985-02-02
                </li>

                <li
                  className={ystyle.filterList__text}
                  onClick={(e) => handleClickFilterYear(e)}
                >
                  1972-06-06
                </li>

                <li
                  className={ystyle.filterList__text}
                  onClick={(e) => handleClickFilterYear(e)}
                >
                  2012-06-01
                </li>

                <li
                  className={ystyle.filterList__text}
                  onClick={(e) => handleClickFilterYear(e)}
                >
                  2021-10-19
                </li>
                <li
                  className={ystyle.filterList__text}
                  onClick={(e) => handleClickFilterYear(e)}
                >
                  2022-07-12
                </li>
                <li
                  className={ystyle.filterList__text}
                  onClick={(e) => handleClickFilterYear(e)}
                >
                  2019
                </li>
              </ul>
            </div>
          ) : null}
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
          {filter === 3 ? (
            <div className={xstyle.filterList}>
              <ul className={xstyle.filterList__Genre}>
                <li
                  className={xstyle.filterList__text}
                  onClick={(e) => handleClickFilterGenre(e)}
                >
                  Классическая музыка
                </li>
                <li
                  className={xstyle.filterList__text}
                  onClick={(e) => handleClickFilterGenre(e)}
                >
                  Электронная музыка
                </li>
                <li
                  className={xstyle.filterList__text}
                  onClick={(e) => handleClickFilterGenre(e)}
                >
                  Рок музыка
                </li>
                <li
                  className={xstyle.filterList__text}
                  onClick={(e) => handleClickFilterGenre(e)}
                >
                  Техно
                </li>
                <li
                  className={xstyle.filterList__text}
                  onClick={(e) => handleClickFilterGenre(e)}
                >
                  Инди
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default FilterButton
