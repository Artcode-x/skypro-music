import PlayerControls from "../playerControls/playerControls";
import TrackPlay from "../trackPlay/trackPlay";
import BarVolume from "../barVolume/barVolume";
import S from "./playerBlock.module.css";

function PlayerBlock({
  audioRef,
  setRepeat,
  repeat,
}) {
  return (
    <div className={S.bar__playerBlock}>
      <div className={S.bar__player}>
        <PlayerControls
          repeat={repeat}
          setRepeat={setRepeat}
          audioRef={audioRef}
        />
        <TrackPlay />
      </div>
      <BarVolume audioRef={audioRef} />
    </div>
  );
}

export default PlayerBlock;
