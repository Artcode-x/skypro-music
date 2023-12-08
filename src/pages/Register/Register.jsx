import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRegister, getToken } from "../../api/Api";
import { addUser } from "../../store/actions/creators/creators";
import { safeString } from "../../components/Helper/Helper";
import logo from "../../img/logo-black.png";
import S from "./Register.module.css";

function Register() {
  const [errorLog, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateInput = () => {
    if (!email) throw new Error("Не введена почта");
    if (!username) throw new Error("Не введен логин");
    if (!password) throw new Error("Не введен пароль");
    if (!repeatPassword) throw new Error("Не введен повторный пароль");
    if (password !== repeatPassword) throw new Error("Пароль не совпадает");
  };

  const getError = (newUser) => {
    if (newUser.email) throw new Error(newUser.email[0]);
    if (newUser.username) throw new Error(newUser.username[0]);
    if (newUser.password) throw new Error(newUser.password[0]);
  };

  const handleRegister = async () => {
    try {
      validateInput();
      setDisabled(true);
      const newUser = await getRegister({
        email: safeString(email),
        username: safeString(username),
        password: safeString(password),
      });
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
  }, [email, password, repeatPassword]);

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
            type="text"
            name="login"
            placeholder="Логин"
            value={username}
            onChange={(event) => {
              setUserName(event.target.value);
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
          <input
            className={S.modalInput}
            type="password"
            name="repeat-password"
            placeholder="Повторите пароль"
            value={repeatPassword}
            onChange={(event) => {
              setRepeatPassword(event.target.value);
            }}
          />
        </div>
        {errorLog && <div className={S.error}>{errorLog}</div>}
        <div className={S.buttons}>
          <button
            className={S.primaryButton}
            type="button"
            onClick={handleRegister}
            disabled={disabled}
          >
            Зарегистрироваться
          </button>
          <Link to="/login">
            <button
              className={S.secondaryButton}
              type="button"
              disabled={disabled}
            >
              Вход
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
