import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLogin, getToken } from "../../api/Api";
import { addUser } from "../../store/actions/creators/creators";
import logo from "../../img/logo-black.png";
import S from "./Login.module.css";

function Login() {
  const [disabled, setDisabled] = useState(false);
  const [errorLog, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInput = () => {
    if (!email) throw new Error("Не введена почта");
    if (!password) throw new Error("Не введен пароль");
  };

  const getError = (newUser) => {
    if (newUser.email) throw new Error(newUser.email[0]);
    if (newUser.username) throw new Error(newUser.username[0]);
    if (newUser.password) throw new Error(newUser.password[0]);
    if (newUser.detail) throw new Error(newUser.detail);
  };

  const handleLogin = async () => {
    try {
      setDisabled(true);
      validateInput();
      const newUser = await getLogin({ email, password });
      if (!newUser.id) getError(newUser);
      const newToken = await getToken({ email, password });
      localStorage.setItem("user", JSON.stringify(newUser));
      localStorage.setItem("tokenRefresh", JSON.stringify(newToken.refresh));
      localStorage.setItem("tokenAccess", JSON.stringify(newToken.access));
      dispatch(addUser(newUser));
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [email, password]);

  return (
    <div className={S.pageContainer}>
      <div className={S.modalForm}>
        <Link to="/login">
          <div className={S.modalLogo}>
            <img className={S.modalLogoImage} src={logo} alt="logo" />
          </div>
        </Link>
        <div className={S.inputs}>
          <input
            className={S.modalInput}
            type="text"
            name="login"
            placeholder="Почта"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className={S.modalInput}
            type="password"
            name="password"
            placeholder="Пароль"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {errorLog && <div className={S.error}>{errorLog}</div>}
        <div className={S.buttons}>
          <button
            className={S.primaryButton}
            type="button"
            onClick={handleLogin}
            disabled={disabled}
          >
            Войти
          </button>
          <Link to="/register">
            <button
              className={S.secondaryButton}
              type="button"
              disabled={disabled}
            >
              Зарегистрироваться
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
