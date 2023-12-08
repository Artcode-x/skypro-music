/* eslint-disable no-param-reassign */
import { useState } from "react";
import style from "./barVolume.module.css";
import sprite from "../../../img/icon/sprite.svg";

function BarVolume({ audioRef }) {
  const [value, setValue] = useState("1");

  const toggleVolume = (e) => {
    setValue(e.target.value);
    audioRef.current.volume = parseFloat(value);
  };

  return (
    <div className={style.bar__volumeBlock}>
      <div className={style.volume__content}>
        <div className={style.volume__image}>
          <svg className={style.volume__svg} alt="volume">
            <use xlinkHref={`${sprite}#icon-volume`} />
          </svg>
        </div>
        <div className={`${style.volume__progress} _btn`}>
          <input
            className={`${style.volume__progressLine} _btn`}
            onInput={(e) => toggleVolume(e)}
            type="range"
            id="volume"
            min="0"
            max="1"
            value={value}
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
}

export default BarVolume;
