import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://ellen-nc-news.herokuapp.com/api',
});

export const fetchArticles = (topic) => {
  return newsApi
    .get('/articles', { params: { topic: topic } })
    .then(({ data: { articles } }) => {
      return articles;
    })
    .catch((err) => {
      console.dir(err);
    });
};

export const fetchSingleArticle = (articleId) => {
  return newsApi
    .get(`/articles`, { params: { article_id: articleId } })
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((err) => {
      console.dir(err);
    });
};
