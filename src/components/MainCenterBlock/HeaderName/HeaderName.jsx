import S from "./HeaderName.module.css";

function HeaderName({ playList, loading }) {
  return <h2 className={S.centerBlock__title}>{loading ? "" : playList}</h2>;
}

export default HeaderName;
