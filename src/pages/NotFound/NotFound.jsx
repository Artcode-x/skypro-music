import { useNavigate } from "react-router-dom";
import style from "./NotFound.module.css";

function NotFound() {
  const navigate = useNavigate();

  const mainButton = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={style.notFound}>
      <h1 className={style.notFound__header}>NotFound 404 PAGE</h1>
      <button
        onClick={mainButton}
        className={style.notFound__button}
        type="button"
      >
        На Main страницу
      </button>
    </div>
  );
}

export default NotFound;
