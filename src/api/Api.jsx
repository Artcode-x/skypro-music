const apiAddress = "https://skypro-music-api.skyeng.tech";

export default function getTrackAll() {
  return fetch(`${apiAddress}/catalog/track/all/`, {
    method: "GET",
  }).then((response) => {
    if (response.status !== 200)
      throw new Error("Не удалось загрузить плейлист, попробуйте позже");
    return response.json();
  });
}

export function getRegister({ email, username, password }) {
  return fetch(`${apiAddress}/user/signup/`, {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    if (response.status === 500) throw new Error("Сервер сломался");
    return response.json();
  });
}

export function getLogin({ email, password }) {
  return fetch(`${apiAddress}/user/login/`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => {
    if (response.status === 500) throw new Error("Сервер сломался");
    return response.json();
  });
}

export function getCategory({ id }) {
  return fetch(`${apiAddress}/catalog/selection/${id}`, {
    method: "GET",
  }).then((response) => {
    if (response.status === 401)
      throw new Error("Не удалось загрузить плейлист, попробуйте позже");
    return response.json();
  });
}

export function getFavoriteTracks(token) {
  return fetch(`${apiAddress}/catalog/track/favorite/all/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 401) throw new Error("Токен протух");
    return response.json();
  });
}

export function getToken({ email, password }) {
  return fetch(`${apiAddress}/user/token/`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
}

export function refreshToken(token) {
  return fetch(`${apiAddress}/user/token/refresh/`, {
    method: "POST",
    body: JSON.stringify({
      refresh: token,
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());
}

export function addLike({ token, id }) {
  return fetch(`${apiAddress}/catalog/track/${id}/favorite/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 401) throw new Error("Токен протух");
    return response.json();
  });
}

export function disLike({ token, id }) {
  return fetch(`${apiAddress}/catalog/track/${id}/favorite/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    if (response.status === 401) throw new Error("Токен протух");
    return response.json();
  });
}
