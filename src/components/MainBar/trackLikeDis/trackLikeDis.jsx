import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import S from "./trackLikeDis.module.css";
import sprite from "../../../img/icon/sprite.svg";
import getTrackAll, { addLike, disLike, refreshToken } from "../../../api/Api";
import addTracks from "../../../store/actions/creators/creators";
import {
  playTrackSelector,
  userSelector,
} from "../../../store/selectors/selectors";

function TrackLikeDis() {
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);
  const user = useSelector(userSelector);
  const tokenRefresh = JSON.parse(localStorage.getItem("tokenRefresh"));
  const tokenAccess = JSON.parse(localStorage.getItem("tokenAccess"));
  const playTrack = useSelector(playTrackSelector);

  const toggleLike = async () => {
    try {
      setDisabled(true);
      if (playTrack.stared_user.find((el) => el.id === user.id)) {
        await disLike({ token: tokenAccess, id: playTrack.id });
      } else {
        await addLike({ token: tokenAccess, id: playTrack.id });
      }
      const response = await getTrackAll();
      dispatch(addTracks(response));
    } catch (error) {
      if (error.message === "Токен протух") {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem("tokenAccess", JSON.stringify(newAccess));
        if (playTrack.stared_user.find((el) => el.id === user.id)) {
          await disLike({ token: newAccess.access, id: playTrack.id });
        } else {
          await addLike({ token: newAccess.access, id: playTrack.id });
        }
        const response = await getTrackAll();
        dispatch(addTracks(response));
        return;
      }
    } finally {
      setDisabled(false);
    }
  };

  return (
    <div className={S.trackPlay__likeDis}>
      <div className={`${S.trackPlay__like} _btn-icon`}>
        <button
          className={S.track__buttonLike}
          disabled={disabled}
          onClick={toggleLike}
          type="button"
        >
          <svg className={S.trackPlay__likeSvg} alt="like">
            {playTrack.stared_user.find((el) => el.id === user.id) ? (
              <use xlinkHref={`${sprite}#icon-likeActive`} />
            ) : (
              <use xlinkHref={`${sprite}#icon-like`} />
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}

export default TrackLikeDis;
