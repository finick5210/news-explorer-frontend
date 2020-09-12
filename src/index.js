import './index.css';
import App from "../src/js/app/App"
import Api from "../src/js/api/Api"
import NewsApi from "./js/api/NewsApi";

const app = new App(
  document.querySelector('.root'),
  new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  }),
  new NewsApi({
    baseUrl: 'http://newsapi.org',
    key: 'faaae2930ed244bba9ef4d58d8d6d550'
  })
);

app.renderPage();