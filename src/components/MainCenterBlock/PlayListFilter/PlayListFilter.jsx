import FavoritesPlayListTrack from "../../../pages/Favorites/FavoritesPlayListTrack/FavoritesPlayListTrack";
import CategoryPlayList from "../../../pages/Сategory/CategoryPlayList/CategoryPlayList";
import PlayListTrack from "../playListTrack/playListTrack";

function PlayListFilter({ loading, getError, playList }) {
  if (playList === "Треки") {
    return <PlayListTrack loading={loading} getError={getError} />;
  }

  if (playList === "Мой плейлист") {
    return <FavoritesPlayListTrack loading={loading} getError={getError} />;
  }

  if (
    playList === "Классическая музыка" ||
    playList === "Электронная музыка" ||
    playList === "Рок музыка"
  ) {
    return <CategoryPlayList loading={loading} getError={getError} />;
  }
}

export default PlayListFilter;
