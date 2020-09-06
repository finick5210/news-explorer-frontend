import './index.css';
import App from "../src/js/app/App"
import Api from "../src/js/api/Api"
import NewsApi from "./js/api/NewsApi";

const app = new App(
  document.querySelector('.root'),
  new Api({
    baseUrl: 'https://api.news-explorer-yandex.tk/',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }),
  new NewsApi()
);

app.renderPage();