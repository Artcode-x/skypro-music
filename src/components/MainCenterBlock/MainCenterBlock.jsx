import style from "./MainCenterBlock.module.css";
import CenterBlockSearch from "./centerBlockSearch/centerBlockSearch";
import FilterButton from "./filterButton/filterButton";
import CenterBlockContent from "./centerBlockContent/centerBlockContent";
import HeaderName from "./HeaderName/HeaderName";

function MainCenterBlock({
  loading,
  getError,
  playList,
}) {
  return (
    <div className={style.main__centerBlock}>
      <CenterBlockSearch />
      <HeaderName playList={playList} loading={loading} />
      <FilterButton />
      <CenterBlockContent
        playList={playList}
        loading={loading}
        getError={getError}
      />
    </div>
  );
}

export default MainCenterBlock;
