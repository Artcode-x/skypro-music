/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./playerProgress.module.css";
import {
  addActiveTrack,
  addPlayTrack,
} from "../../../store/actions/creators/creators";
import allTracksSelector, {
  activeTrackSelector,
  shuffleTracksSelector,
} from "../../../store/selectors/selectors";
import formatTime from "../../Helper/Helper";

function PlayerProgress({ audioRef }) {
  const [value, setValue] = useState("1");
  const [duration, setDuration] = useState("0");
  const allTracks = useSelector(allTracksSelector);
  const activeTrack = useSelector(activeTrackSelector);
  const shuffleTrack = useSelector(shuffleTracksSelector);
  const dispatch = useDispatch();

  const toggleProgress = (e) => {
    audioRef.current.currentTime = e.target.value;
  };

  useEffect(() => {
    if (audioRef?.current.duration) {
      setDuration(audioRef.current.duration);
    }
  });

  useEffect(() => {
    if (audioRef?.current.currentTime) {
      audioRef.current.addEventListener("timeupdate", () => {
        setValue(audioRef.current.currentTime);
        return () => {
          audioRef.current.removeEventListener("timeupdate", () => {
            setValue(audioRef.current.currentTime);
          });
        };
      });
    }
  });

  useEffect(() => {
    if (value === duration) {
      if (activeTrack.index === allTracks.length - 1) return;
      dispatch(
        addActiveTrack({ ...activeTrack, index: activeTrack.index + 1 })
      );
      if (activeTrack.shuffle) {
        dispatch(addPlayTrack(shuffleTrack[activeTrack.index + 1]));
      } else {
        dispatch(addPlayTrack(allTracks[activeTrack.index + 1]));
      }
    }
  }, [value]);

  return (
    <>
      <input
        className={`${style.bar__playerProgress} _btn`}
        onInput={(e) => toggleProgress(e)}
        type="range"
        id="volume"
        min="0"
        max={duration}
        value={value}
        step="0.01"
      />
      <div className={style.bar__time}>
        {formatTime(Math.floor(value))}/{formatTime(Math.floor(duration))}
      </div>
    </>
  );
}

export default PlayerProgress;
