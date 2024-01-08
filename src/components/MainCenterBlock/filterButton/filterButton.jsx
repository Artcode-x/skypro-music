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
  setArrayGenre,
  setArrayYear,
  setFilteredTracks,
  setFlagFilters,
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

  let arrayYear = []
  arrayYear = useSelector((store) => store.tracks.arrayYear)

  let arrayGenre = []
  arrayGenre = useSelector((store) => store.tracks.arrayGenre)

  // для сортировки
  const [selectedAuthor, setSelectedAuthor] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedYear, setSelectedYear] = useState([])

  const [chosenAuthors, setChosenAuthors] = useState([])

  // const [selectedAuthors, setSelectedAuthors] = useState()

  // ДЛЯ АВТОРОВ
  /// 1. Создаем массив с авторами трека
  const newArr = allTracks.map((key) => {
    return key.author
  })

  // 2. делам так чтобы авторы не повторялись
  const UniqueArrayOfAuthor = [...new Set(newArr.sort())]
  // console.log(UniqueArrayOfAuthor)
  ///

  // ДЛЯ ЖАНРОВ
  const GenreArr = allTracks.map((key) => {
    return key.genre
  })
  const UniqueArrOfGenre = [...new Set(GenreArr.sort())]
  // console.log(UniqueArrOfGenre)
  // ДЛЯ ДАТ
  const YearArr = allTracks.map((key) => {
    return key.release_date
  })
  const UniqueArrOfYear = [...new Set(YearArr.sort())]
  // console.log(UniqueArrOfYear)

  ////////////////////////////////////////////////////////////////////
  const handleClickFilter = (e) => {
    // setFilterAuthor(key.target.textContent)

    // const filteredAuthor = allTracks.filter(
    //   (track) => track.author === key.target.textContent
    // )
    const author = e.target.textContent
    // dispatch(setFilteredTracks(true))
    // console.log(filteredAuthor[0])
    // console.log(filteredByAuthor)
    // const mixArray = filteredByAuthor.concat(filteredAuthor)
    // const newArray = [...filteredByAuthor, filteredAuthor]

    // dispatch(setArrayFilteredTracks([...filteredByAuthor, author]))

    if (filteredByAuthor.includes(author)) {
      dispatch(
        setArrayFilteredTracks(
          filteredByAuthor.filter((item) => item != author)
        )
      )
    } else {
      dispatch(setArrayFilteredTracks([...filteredByAuthor, author]))
    }

    // dispatch(setFlagFilters("author"))
    // console.log(newArray)
    // console.log(filteredByAuthor)
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
    // console.log(chosenAuthors)
  }, [])

  // console.log(selectedAuthor)
  // у фильтра значения 0,1,2,3
  useEffect(() => {
    if (filter === 0) {
      dispatch(setFilteredTracks(false))
    }
  }, [filter])

  const handleClickFilterGenre = (e) => {
    // setFilterGenre(e.target.textContent)
    // const filterGenre = allTracks.filter(
    //   (track) => track.genre === e.target.textContent
    // )

    const genre = e.target.textContent
    //  dispatch(setFilteredTracks(true))

    //  dispatch(setArrayFilteredTracks([...filteredByAuthor, filterGenre]))
    // dispatch(setArrayGenre([...arrayGenre, genre]))

    if (arrayGenre.includes(genre)) {
      dispatch(setArrayGenre(arrayGenre.filter((item) => item != genre)))
    } else {
      dispatch(setArrayGenre([...arrayGenre, genre]))
    }

    // dispatch(setFlagFilters("genre"))
    //  console.log(arrayGenre)
  }

  // const handleClickFilterYear = (e) => {
  //   setFilterYear(e.target.textContent)
  //   const filterYear = allTracks.filter(
  //     (track) => track.release_date === e.target.textContent
  //   )
  //   dispatch(setFilteredTracks(true))
  //   // dispatch(setArrayFilteredTracks(filterYear))
  //   dispatch(setArrayYear([...arrayYear, filterYear[0]]))
  //   dispatch(setFlagFilters("year"))
  // }

  // const filterTracks = () => {}

  const handle4filter = (e) => {
    console.log(e.taget.textContent)
  }

  // ДЛЯ АВТОРОВ
  // 3. для отображения всех авторов применяем map к ранее созданному массиву
  const listOfAuthors = UniqueArrayOfAuthor.map((key) => {
    return (
      <li
        className={styled.filterList__text}
        onClick={(e) => handleClickFilter(e)}
      >
        {key}
      </li>
    )
  })

  // ДЛЯ ЖАНРОВ
  const listOfGenre = UniqueArrOfGenre.map((item) => {
    return (
      <li
        className={xstyle.filterList__text}
        onClick={(e) => handleClickFilterGenre(e)}
      >
        {item}
      </li>
    )
  })
  // ДЛЯ ДАТ
  // const listOfDate = UniqueArrOfYear.map((date) => {
  //   return (
  //     <li
  //       className={ystyle.filterList__text}
  //      // onClick={(e) => handleClickFilterYear(e)}
  //     >
  //       {date}
  //     </li>
  //   )
  // })
  console.log(arrayYear)

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
            <div className={styled.filterList} key={listOfAuthors.id}>
              <ul className={styled.filterList__performer}>
                {/* а тут отобразим наших авторов */}
                {listOfAuthors}
              </ul>
            </div>
          ) : null}
        </div>
        <div>
          {filter === 2 ? (
            <div
              className={styled.filterList}
              //key={listOfDate.id}
            >
              <ul className={styled.filterList__performer}>
                {/* {listOfDate} */}
                {/* <div className={ystyle.filterList__year}> */}
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
            {/* логика иконки индикатора */}
            {arrayGenre.length !== 0 && (
              <div className={style.Tbl}>
                {/* пок-м длинну массива */}
                <div className={styled.color1}>{arrayGenre.length}</div>
              </div>
            )}
            жанру
          </div>
          {filter === 3 ? (
            <div className={xstyle.filterList} key={listOfGenre.id}>
              <ul className={xstyle.filterList__Genre}>
                {/* тут отобразим жанры  */}
                {listOfGenre}
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
              {/* логика иконки индикатора */}
              {arrayYear.length !== 0 && (
                <div className={style.Tbl}>
                  {/* пок-м длинну массива */}
                  <div className={styled.color1}>
                    {arrayYear == "сначала новые"
                      ? String.fromCodePoint(8593)
                      : arrayYear == "сначала старые"
                      ? String.fromCodePoint(8595)
                      : ">"}
                  </div>
                </div>
              )}
              СОРТИРовка
            </div>
            {filter === 4 ? (
              <div className={xstyle.filterList}>
                <ul className={xstyle.filterList__Genre}>
                  <li
                    className={xstyle.filterList__text}
                    onClick={() => dispatch(setArrayYear("по умолчанию"))}
                  >
                    по умолчанию
                  </li>
                  <li
                    className={xstyle.filterList__text}
                    onClick={() => dispatch(setArrayYear("сначала новые"))}
                  >
                    сначала новые
                  </li>
                  <li
                    className={xstyle.filterList__text}
                    onClick={() => dispatch(setArrayYear("сначала старые"))}
                  >
                    сначала старые
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
