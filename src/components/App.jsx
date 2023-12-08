/* eslint-disable react/jsx-no-constructed-context-values */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/actions/creators/creators";
import { playTrackSelector } from "../store/selectors/selectors";
import AppRoutes from "./AppRoutes/AppRoutes";
import MainBar from "./MainBar/MainBar";

function App() {
  const playTrack = useSelector(playTrackSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addUser(JSON.parse(localStorage.getItem("user"))));
  }, []);

  return (
    <>
      {playTrack.id ? <MainBar playTrack={playTrack} /> : null}
      <AppRoutes />
    </>
  );
}

export default App;
