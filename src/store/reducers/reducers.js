/* eslint-disable default-param-last */
import { currentPlayList } from "../../components/Helper/Helper"
import {
  ADD_TRACK,
  PLAY_TRACK,
  ACTIVE_TRACK,
  SHUFFLE_TRACKS,
  ADD_USER,
  FAVORITES_TRACKS,
  NEXT_AND_PREV_TRACK,
  ADD_CATEGORY_PLAYLIST,
  SEARCH,
  FILTERED_TRACKS,
  ARRAY_FITERED_TRACKS,
} from "../actions/types/types"

const initialTracks = {
  user: null,
  allTracks: [],
  playTrack: {},
  activeTrack: {
    shuffle: false,
    playList: "allTracks",
    prevPlayList: "",
  },
  shuffleTracks: [],
  categoryPlayList: {},
  favoriteTracks: [],
  search: "",
  isFilteredTracks: false,
  filteredTracksArray: [],
}

function tracksReducer(state = initialTracks, action) {
  switch (action.type) {
    case ADD_USER: {
      const { user } = action.payload

      return {
        ...state,
        user,
      }
    }

    case ADD_TRACK: {
      const { tracks } = action.payload

      return {
        ...state,
        allTracks: tracks,
      }
    }

    case PLAY_TRACK: {
      const { playTrack } = action.payload

      return {
        ...state,
        playTrack,
      }
    }

    case ACTIVE_TRACK: {
      const { activeTrack } = action.payload

      return {
        ...state,
        activeTrack,
      }
    }

    case SHUFFLE_TRACKS: {
      if (state.activeTrack.shuffle)
        return {
          ...state,
          activeTrack: {
            ...state.activeTrack,
            shuffle: false,
            playList: state.activeTrack.prevPlayList,
          },
        }

      const playList = currentPlayList(state)
      const prevPlayList = state.activeTrack.playList
      const shuffleTracks = playList.map((track) => track)

      shuffleTracks.sort(() => Math.random() - 0.5)

      return {
        ...state,
        shuffleTracks,
        activeTrack: {
          ...state.activeTrack,
          playList: "shuffleTracks",
          prevPlayList,
          shuffle: true,
          idTrack: "newId",
        },
      }
    }

    case FAVORITES_TRACKS: {
      const { favoriteTracks } = action.payload

      return {
        ...state,
        favoriteTracks,
      }
    }

    case NEXT_AND_PREV_TRACK: {
      const { nextOrPrev } = action.payload
      const playList = currentPlayList(state)

      const currentIndex = playList.findIndex(
        (track) => track.id === state.activeTrack.idTrack
      )

      const newTrack =
        nextOrPrev === "next"
          ? playList[currentIndex + 1]
          : playList[currentIndex - 1]

      if (!newTrack) return state

      return {
        ...state,
        playTrack: newTrack,
        activeTrack: {
          ...state.activeTrack,
          active: true,
          idTrack: newTrack.id,
        },
      }
    }

    case ADD_CATEGORY_PLAYLIST: {
      const { categoryPlayList } = action.payload

      return {
        ...state,
        categoryPlayList,
      }
    }

    case SEARCH: {
      const { search } = action.payload

      return {
        ...state,
        search,
      }
    }

    case FILTERED_TRACKS: {
      const { isFilteredTracks } = action.payload

      return {
        ...state,
        isFilteredTracks,
      }
    }

    case ARRAY_FITERED_TRACKS: {
      const { filteredTracksArray } = action.payload

      return {
        ...state,
        filteredTracksArray,
      }
    }

    default:
      return state
  }
}

export default tracksReducer
