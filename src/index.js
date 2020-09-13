import './index.css';
import App from './js/app/App';
import Api from './js/api/Api';
import NewsApi from './js/api/NewsApi';

const app = new App(
  document.querySelector('.root'),
  new Api({
    baseUrl: 'http://news-explorer-yandex.tk/api',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }),
  new NewsApi({
    baseUrl: 'https://nomoreparties.co/news',
    key: 'faaae2930ed244bba9ef4d58d8d6d550',
  }),
  false,
);

app.renderPage();
