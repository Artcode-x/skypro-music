import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../store/selectors/selectors";
import sprite from "../../../img/icon/sprite.svg";
import S from "./sidebarPersonal.module.css";
import { addPlayTrack, addUser } from "../../../store/actions/creators/creators";

function SidebarPersonal() {
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const exit = () => {
    dispatch(addUser(null));
    dispatch(addPlayTrack({}));
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className={S.sidebar__personal}>
      <p className={S.sidebar__personalName}>{user.username}</p>
      <button onClick={exit} type="button" className={S.sidebar__button}>
        <svg className={S.sidebar__avatar} alt="exit">
          <use xlinkHref={`${sprite}#icon-exit`} />
        </svg>
      </button>
    </div>
  );
}

export default SidebarPersonal;
