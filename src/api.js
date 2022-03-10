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

export const updateVotes = (article_id, change) => {
  return newsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: change,
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.dir(err);
    });
};

export const fetchSingleArticle = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((err) => {
      console.dir(err);
    });
};
