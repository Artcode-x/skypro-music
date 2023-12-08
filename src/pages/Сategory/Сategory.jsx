import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../api/Api";
import MainCenterBlock from "../../components/MainCenterBlock/MainCenterBlock";
import MainNav from "../../components/MainNav/MainNav";
import MainSidebar from "../../components/MainSidebar/MainSidebar";
import S from "./Сategory.module.css";
import { addCategoryPlayList } from "../../store/actions/creators/creators";

function Сategory() {
  const [getError, setGetError] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const categoryName = useSelector(
    (state) => state.tracks.categoryPlayList.name
  );

  const asyncGetCategory = async () => {
    try {
      const response = await getCategory({ id: params.id });
      dispatch(addCategoryPlayList(response));
    } catch (error) {
      setGetError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    asyncGetCategory();
  }, [params]);

  return (
    <main className={S.main}>
      <MainNav />
      <MainCenterBlock
        playList={categoryName}
        loading={loading}
        getError={getError}
      />
      <MainSidebar loading={loading} />
    </main>
  );
}

export default Сategory;
