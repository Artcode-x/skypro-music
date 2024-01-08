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
  ARRAY_YEAR,
  ARRAY_GENRE,
  FLAG_FILTERS,
} from "../types/types"

const addTracks = (tracks) => ({
  type: ADD_TRACK,
  payload: { tracks },
})

export const addPlayTrack = (playTrack) => ({
  type: PLAY_TRACK,
  payload: { playTrack },
})

export const addActiveTrack = (activeTrack) => ({
  type: ACTIVE_TRACK,
  payload: { activeTrack },
})

export const addShuffleTracks = () => ({
  type: SHUFFLE_TRACKS,
})

export const addUser = (user) => ({
  type: ADD_USER,
  payload: { user },
})

export const addFavoriteTracks = (favoriteTracks) => ({
  type: FAVORITES_TRACKS,
  payload: { favoriteTracks },
})

export const addNextOrPrevTrack = (nextOrPrev) => ({
  type: NEXT_AND_PREV_TRACK,
  payload: { nextOrPrev },
})

export const addCategoryPlayList = (categoryPlayList) => ({
  type: ADD_CATEGORY_PLAYLIST,
  payload: { categoryPlayList },
})

export const addSearchUpdate = (search) => ({
  type: SEARCH,
  payload: { search },
})

export const setFilteredTracks = (isFilteredTracks) => ({
  type: FILTERED_TRACKS,
  payload: { isFilteredTracks },
})

export const setArrayFilteredTracks = (filteredTracksArray) => ({
  type: ARRAY_FITERED_TRACKS,
  payload: [filteredTracksArray],
})

export const setArrayGenre = (arrayGenre) => ({
  type: ARRAY_GENRE,
  payload: [arrayGenre],
})

export const setArrayYear = (arrayYear) => ({
  type: ARRAY_YEAR,
  payload: [arrayYear],
})

export const setFlagFilters = (flag) => ({
  type: FLAG_FILTERS,
  payload: { flag },
})

export default addTracks
