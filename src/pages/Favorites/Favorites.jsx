import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getFavoriteTracks, refreshToken } from "../../api/Api";
import { addFavoriteTracks } from "../../store/actions/creators/creators";
import MainCenterBlock from "../../components/MainCenterBlock/MainCenterBlock";
import MainNav from "../../components/MainNav/MainNav";
import MainSidebar from "../../components/MainSidebar/MainSidebar";
import S from "./Favorites.module.css";

function Favorites() {
  const [getError, setGetError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const tokenRefresh = JSON.parse(localStorage.getItem("tokenRefresh"));
  const tokenAccess = JSON.parse(localStorage.getItem("tokenAccess"));

  const asyncGetTrackAll = async () => {
    try {
      const favoriteTracks = await getFavoriteTracks(tokenAccess);
      dispatch(addFavoriteTracks(favoriteTracks));
    } catch (error) {
      if (error.message === "Токен протух") {
        const newAccess = await refreshToken(tokenRefresh);
        localStorage.setItem("tokenAccess", JSON.stringify(newAccess));
        const favoriteTracks = await getFavoriteTracks(newAccess.access);
        dispatch(addFavoriteTracks(favoriteTracks));
        return;
      }
      setGetError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    asyncGetTrackAll();
  }, []);

  return (
    <main className={S.main}>
      <MainNav />
      <MainCenterBlock playList="Мой плейлист" loading={loading} getError={getError} />
      <MainSidebar loading={loading} />
    </main>
  );
}

export default Favorites;
