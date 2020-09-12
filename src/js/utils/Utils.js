export const addClass = (element, elementClass) => {
  element.classList.add(elementClass);
};

export const removeClass = (element, elementClass) => {
  element.classList.remove(elementClass);
};

export const addTextContent = (element, textContent) => {
  element.textContent = textContent;
};

export const toggleClass = (element, elementClass) => {
  element.classList.toggle(elementClass);
};

export const getToken = () => {
  const match = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
  return match ? match[2] : null;
};

export const removeToken = () => {
  const token = getToken();
  document.cookie = document.cookie.replace(token, `${token}; expires=Thu, 01 Jan 1970 00:00:00 UTC;`);
};

export const getResponse = (res) => (res.ok ? res.json() : Promise.reject(res.status));
