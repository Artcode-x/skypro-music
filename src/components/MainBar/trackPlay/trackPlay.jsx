import { useSelector } from "react-redux";
import { playTrackSelector } from "../../../store/selectors/selectors";
import sprite from "../../../img/icon/sprite.svg";
import TrackLikeDis from "../trackLikeDis/trackLikeDis";
import S from "./trackPlay.module.css";

function TrackPlay() {
  const playTrack = useSelector(playTrackSelector);

  return (
    <div className={S.player__trackPlay}>
      <div className={S.trackPlay__contain}>
        <div className={S.trackPlay__image}>
          <svg className={S.trackPlay__svg} alt="music">
            <use xlinkHref={`${sprite}#icon-note`} />
          </svg>
        </div>
        <div className={S.trackPlay__author}>
          <button type="button" className={S.trackPlay__authorLink}>
            {playTrack.name}
          </button>
        </div>
        <div className={S.trackPlay__album}>
          <button type="button" className={S.trackPlay__albumLink}>
            {playTrack.author}
          </button>
        </div>
      </div>
      <TrackLikeDis />
    </div>
  );
}

export default TrackPlay;
