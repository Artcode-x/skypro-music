import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import addTracks, {
  addActiveTrack,
  addPlayTrack,
} from "../../../store/actions/creators/creators";
import Skeleton from "../../../components/Skeleton";
import sprite from "../../../img/icon/sprite.svg";
import S from "./CategoryPlayList.module.css";
import getTrackAll, { addLike, disLike, refreshToken } from "../../../api/Api";
import {
  activeTrackSelector,
  categoryTracksSelector,
  playTrackSelector,
  userSelector,
} from "../../../store/selectors/selectors";
import formatTime from "../../../components/Helper/Helper";

function CategoryPlayList({ loading, getError }) {
  const categoryPlayList = useSelector(categoryTracksSelector);
  const [disabled, setDisabled] = useState(false);
  const user = useSelector(userSelector);
  const playTrack = useSelector(playTrackSelector);
  const activeTrack = useSelector(activeTrackSelector);
  const dispatch = useDispatch();
  const tokenRefresh = JSON.parse(localStorage.getItem("tokenRefresh"));
  const tokenAccess = JSON.parse(localStorage.getItem("tokenAccess"));

  const toggleTrack = (track) => {
    dispatch(
      addActiveTrack({
        ...activeTrack,
        playList: "categoryPlayList",
        active: true,
        idTrack: track.id,
      })
    );
    dispatch(addPlayTrack(track));
  };

  const toggleLike = async (track) => {
    try {
      setDisabled(true);
      if (track.stared_user.find((el) => el.id === user.id)) {
        await disLike({ token: tokenAccess, id: track.id });
      } else {
        await addLike({ token: tokenAccess, id: track.id });
      }
      const response = await getTrackAll();
      dispatch(addTracks(response));
    } catch (error) {
      if (error.message === "Токен протух") {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem("tokenAccess", JSON.stringify(newAccess));
        if (track.stared_user.find((el) => el.id === user.id)) {
          await disLike({ token: newAccess.access, id: track.id });
        } else {
          await addLike({ token: newAccess.access, id: track.id });
        }
        const response = await getTrackAll();
        dispatch(addTracks(response));
        return;
      }
    } finally {
      setDisabled(false);
    }
  };

  if (getError) {
    return (
      <div className={S.content__playlist}>
        <div className={S.playlist__item}>
          <div className={S.playlist__track}>
            <h1>{getError}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={S.content__playlist}>
      <div className={S.playlist__item}>
        {loading ? (
          <div className={S.playlist__track}>
            <div className={S.track__title}>
              <div className={S.track__titleImage}>
                <Skeleton w="51px" h="51px" />
              </div>
              <div className={S.titleText}>
                <Skeleton w="356px" h="19px" />
              </div>
            </div>
            <div className={S.track__author}>
              <Skeleton w="271px" h="19px" />
            </div>
            <div className={S.track__album}>
              <Skeleton w="305px" h="19px" />
            </div>
            <div className={S.time}>
              <Skeleton w="60.8px" h="19px" />
            </div>
          </div>
        ) : (
          categoryPlayList.map((track) => (
            <div key={track.id} className={S.playlist__track}>
              <div className={S.track__title}>
                <div className={S.track__titleImage}>
                  {track.id === playTrack.id ? (
                    <div
                      className={
                        activeTrack.active
                          ? S.track__Active
                          : S.track__nonActive
                      }
                    />
                  ) : (
                    <svg className={S.track__titleSvg} alt="music">
                      <use xlinkHref={`${sprite}#icon-note`} />
                    </svg>
                  )}
                </div>
                <div className={S.titleText}>
                  <button
                    type="button"
                    onClick={() => toggleTrack(track)}
                    className={S.track__titleLink}
                  >
                    {track.name} <span className={S.track__titleSpan} />
                  </button>
                </div>
              </div>
              <div className={S.track__author}>
                <button
                  type="button"
                  onClick={() => toggleTrack(track)}
                  className={S.track__authorLink}
                >
                  {track.author}
                </button>
              </div>
              <div className={S.track__album}>
                <button
                  type="button"
                  onClick={() => toggleTrack(track)}
                  className={S.track__albumLink}
                >
                  {track.album}
                </button>
              </div>
              <div className={S.time}>
                <button
                  disabled={disabled}
                  onClick={() => toggleLike(track)}
                  type="button"
                  className={S.track__buttonLike}
                >
                  <svg className={S.track__timeSvg} alt="time">
                    {track.stared_user.find((el) => el.id === user.id) ? (
                      <use xlinkHref={`${sprite}#icon-likeActive`} />
                    ) : (
                      <use xlinkHref={`${sprite}#icon-like`} />
                    )}
                  </svg>
                </button>
                <span className={S.track__timeText}>
                  {formatTime(track.duration_in_seconds)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoryPlayList;
