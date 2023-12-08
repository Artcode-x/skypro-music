/* eslint-disable jsx-a11y/media-has-caption */
import { useRef, useState } from "react";
import PlayerProgress from "./playerProgress/playerProgress";
import PlayerBlock from "./playerBlock/playerBlock";
import S from "./MainBar.module.css";

function MainBar({ playTrack }) {
  const audioRef = useRef(null);
  const [repeat, setRepeat] = useState(false);

  return (
    <div className={S.bar}>
      <div className={S.bar__content}>
        <audio
          ref={audioRef}
          src={playTrack ? playTrack.track_file : null}
          autoPlay
          loop={repeat}
        />
        <PlayerProgress audioRef={audioRef} />
        <PlayerBlock
          repeat={repeat}
          setRepeat={setRepeat}
          audioRef={audioRef}
        />
      </div>
    </div>
  );
}

export default MainBar;
