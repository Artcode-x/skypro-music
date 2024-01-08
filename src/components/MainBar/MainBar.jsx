/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef, useState } from "react"
import PlayerProgress from "./playerProgress/playerProgress"
import PlayerBlock from "./playerBlock/playerBlock"
import S from "./MainBar.module.css"
import { useDispatch } from "react-redux"
import { addNextOrPrevTrack } from "../../store/actions/creators/creators"

function MainBar({ playTrack }) {
  const audioRef = useRef(null)
  const [repeat, setRepeat] = useState(false)

  const dispatch = useDispatch()

  const nextTrack = () => {
    dispatch(addNextOrPrevTrack("next"))
  }

  useEffect(() => {
    nextTrack()
    if (audioRef) {
      audioRef.current.addEventListener("ended", nextTrack)
    }
    return () => audioRef.current.removeEventListener("ended", nextTrack)
  }, [audioRef])

  return (
    <div className={S.bar}>
      <div className={S.bar__content}>
        <audio
          ref={audioRef}
          src={playTrack ? playTrack.track_file : null}
          autoPlay
          loop={repeat}
          onEnded={nextTrack}
        />
        <PlayerProgress audioRef={audioRef} />
        <PlayerBlock
          repeat={repeat}
          setRepeat={setRepeat}
          audioRef={audioRef}
        />
      </div>
    </div>
  )
}

export default MainBar
