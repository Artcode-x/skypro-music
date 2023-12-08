import style from "./centerBlockContent.module.css";
import ContentTitle from "../contentTitle/contentTitle";
import PlayListFilter from "../PlayListFilter/PlayListFilter";

function CenterBlockContent({
  loading,
  getError,
  playList,
}) {
  return (
    <div className={style.centerBlock__content}>
      <ContentTitle />
      <PlayListFilter
        playList={playList}
        loading={loading}
        getError={getError}
      />
    </div>
  );
}

export default CenterBlockContent;
