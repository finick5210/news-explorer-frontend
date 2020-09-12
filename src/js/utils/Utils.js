export const addClass = (element, elementClass) => {
  element.classList.add(elementClass);
};

export const removeClass = (element, elementClass) => {
  element.classList.remove(elementClass);
};

export const checkClass = (element, elementClass) => {
  element.classList.contains(elementClass);
};

export const addTextContent = (element, textContent) => {
  element.textContent = textContent;
};

export const resetError = (error) => {
  error.innerHTML = '';
  error.classList.remove('popup__error');
};

export const toggleClass = (element, elementClass) => {
  element.classList.toggle(elementClass);
};

export const getToken = () => {
  const match = document.cookie.match(new RegExp('(^| )' + 'token' + '=([^;]+)'));
  return match ? match[2] : null;
};

export const getResponse = (res) => (res.ok ? res.json() : Promise.reject(res.status));
