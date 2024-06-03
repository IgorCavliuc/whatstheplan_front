export const url = "http://91.107.222.18:5555/api";

export const signin = async (data = {}) => {
  const response = await fetch(url + "/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};

export const signup = async (data = {}) => {
  const response = await fetch(url + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
export const getUser = async (token: string) => {
  const response = await fetch(url + "/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const userData = await response.json(); // Получение JSON-данных из ответа
  return { userData };
};

export const refreshToken = async (token: string) => {
  const response = await fetch(url + "/auth/refresh-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const userData = await response.json(); // Получение JSON-данных из ответа
  return { userData };
};
