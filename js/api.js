const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  [Method.GET]: 'Ошибка загрузки данных',
  [Method.POST]: 'Ошибка отправки данных'
};

const load = async (route, method = Method.GET, body = null) => {
  const response = await fetch(`${BASE_URL}${route}`, { method, body });

  return response.ok ? await response.json() : Promise.reject(ErrorText[method]);
};

export const getData = async () =>await load(Route.GET_DATA);

export const sendData = async (body) => await load(Route.SEND_DATA, Method.POST, body);
