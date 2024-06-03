export const setCookie = (name: string, value: string) => {
  let expires = "";
  const date = new Date();
  date.setTime(date.getTime() + 2 * 24 * 60 * 60 * 1000); // Установка срока действия на 1 день
  expires = "; expires=" + date.toUTCString();
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
};

export const removeCookie = (name: string) => {
  document.cookie = name + "=; Max-Age=-99999999; path=/";
};

export const getCookie = (name: string) => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
