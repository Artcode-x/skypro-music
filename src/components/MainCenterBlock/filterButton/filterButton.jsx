import { useEffect, useState } from "react"
import style from "./filterButton.module.css"
import ystyle from "../filterListYear/filterListYear.module.css"
// import FilterListYear from "../filterListYear/filterListYear"

import { useDispatch, useSelector } from "react-redux"
import allTracksSelector, {
  filteredArrayTracksSelector,
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

  const flag = useSelector(filteredTracksSelector)

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

  let filteredByAuthor = []
  filteredByAuthor = useSelector(filteredArrayTracksSelector)
  // для сортировки
  const [selectedAuthor, setSelectedAuthor] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedYear, setSelectedYear] = useState([])

  const [chosenAuthors, setChosenAuthors] = useState([])

  const [selectedAuthors, setSelectedAuthors] = useState()

  /// 1. Создаем массив с авторами трека
  const newArr = allTracks.map((key) => {
    return key.author
  })

  // 2. делам так чтобы авторы не повторялись
  const UniqueArrayOfAuthor = [...new Set(newArr.sort())]
  console.log(UniqueArrayOfAuthor)
  ///

  const handleClickFilter = (e) => {
    setFilterAuthor(e.target.textContent)

    const filteredAuthor = allTracks.filter(
      (track) => track.author === e.target.textContent
    )

    dispatch(setFilteredTracks(true))
    console.log(filteredAuthor[0])
    console.log(filteredByAuthor)
    // const mixArray = filteredByAuthor.concat(filteredAuthor)
    // const newArray = [...filteredByAuthor, filteredAuthor]
    dispatch(setArrayFilteredTracks([...filteredByAuthor, filteredAuthor[0]]))
    // console.log(newArray)
    console.log(filteredByAuthor)
  }

  // убрать фильтр
  //   function handleClick(key) {
  // убрать
  //     if (authorArray.includes(key)) {
  //         dispatch(
  //             setFilterByAuthor(authorArray.filter((item) => item != key))
  //         )
  // добавить
  //     } else {
  //         dispatch(setFilterByAuthor([...authorArray, key]))
  //     }
  // }
  // function clearFilter(){
  //     dispatch(setFilterByAuthor([]))
  // }

  useEffect(() => {
    setChosenAuthors([123])
    console.log(chosenAuthors)
  }, [])

  // console.log(selectedAuthor)
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
    //  dispatch(setFilteredTracks(true))

    //  dispatch(setArrayFilteredTracks([...filteredByAuthor, filterGenre]))
  }

  const handleClickFilterYear = (e) => {
    setFilterYear(e.target.textContent)
    const filterYear = allTracks.filter(
      (track) => track.release_date === e.target.textContent
    )
    dispatch(setFilteredTracks(true))
    // dispatch(setArrayFilteredTracks(filterYear))
  }

  const filterTracks = () => {}

  const handle4filter = (e) => {
    console.log(e.taget.textContent)
  }

  // 3. для отображения всех авторов применяем map к ранее созданному массиву
  const listOfAuthors = UniqueArrayOfAuthor.map((key) => {
    return (
      <li
        className={styled.filterList__text}
        onClick={(e) => handleClickFilter(e)}
      >
        {key}
      </li>
      // <S.FilterAuthorItems
      //     href="#"
      //     key={key}
      //     onClick={() => handleClickFilter(key)}
      // >
      //     {filteredByAuthor.includes(key) ? (
      //         <S.FilterAuthorItemsActive>{key}</S.FilterAuthorItemsActive>
      //     ) : (
      //         <span>{key}</span>
      //     )}
      // </S.FilterAuthorItems>
    )
  })

  return (
    <div className={style.centerBlock__filter}>
      <div className={style.filter__title}>Искать по:</div>
      <div className={style.filter__box}>
        <div>
          {/* {flag ? (доп стиль чтобы что то горело) : (блок ниже)} */}

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
            {filteredByAuthor.length !== 0 && (
              <div className={style.Tbl}>
                {/* пок-м длинну массива */}
                <div className={styled.color1}>{filteredByAuthor.length}</div>
              </div>
            )}
            исполнителю
          </div>

          {filter === 1 ? (
            <div className={styled.filterList}>
              {/* listOfAuthors.map((item) => {
    return
              }) */}
              <ul className={styled.filterList__performer}>{listOfAuthors}</ul>
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

        <div className="otstup">
          <div>
            <div
              onClick={() => toggleFilter(4)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) =>
                handleKeyDown(event.key === "Enter" ? 4 : null)
              }
              className={filter === 4 ? style.button17_activee : style.button17}
            >
              СОРТИРовка по новизне
            </div>
            {filter === 4 ? (
              <div className={xstyle.filterList}>
                <ul className={xstyle.filterList__Genre}>
                  <li
                    className={xstyle.filterList__text}
                    onClick={(e) => handle4filter(e)}
                  >
                    Задолбал
                  </li>
                  <li
                    className={xstyle.filterList__text}
                    onClick={(e) => handle4filter(e)}
                  >
                    Меня этот
                  </li>
                  <li
                    className={xstyle.filterList__text}
                    onClick={(e) => handle4filter(e)}
                  >
                    Плеер
                  </li>
                  <li
                    className={xstyle.filterList__text}
                    onClick={(e) => handle4filter(e)}
                  >
                    Ужасно
                  </li>
                  <li
                    className={xstyle.filterList__text}
                    onClick={(e) => handle4filter(e)}
                  >
                    !!!!!
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterButton
