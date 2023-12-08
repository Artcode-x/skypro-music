import style from "./contentTitle.module.css";
import sprite from "../../../img/icon/sprite.svg";

function ContentTitle() {
  return (
    <div className={style.content__title}>
      <div className={`${style.playlist__col} col01`}>Трек</div>
      <div className={`${style.playlist__col} col02`}>ИСПОЛНИТЕЛЬ</div>
      <div className={`${style.playlist__col} col03`}>АЛЬБОМ</div>
      <div className={`${style.playlist__col} col04`}>
        <svg className={style.playlist__svg} alt="time">
          <use xlinkHref={`${sprite}#icon-watch`} />
        </svg>
      </div>
    </div>
  );
}

export default ContentTitle;
