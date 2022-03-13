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
      console.log(err);
      throw new Error(err.response.data.msg);
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
      throw new Error(err.response.data.msg);
    });
};

export const fetchSingleArticle = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    })
    .catch((err) => {
      throw new Error(err.response.data.msg);
    });
};

export const fetchComments = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    })
    .catch((err) => {
      throw new Error(err.response.data.msg);
    });
};

export const postComment = (article_id, commentToPost, loggedIn) => {
  return newsApi
    .post(`/articles/${article_id}/comments`, {
      username: loggedIn,
      body: commentToPost,
    })
    .then(({ data: { comment } }) => {
      return comment;
    })
    .catch((err) => {
      throw new Error(err.response.data.msg);
    });
};

export const deleteComment = (commentId) => {
  return newsApi.delete(`/comments/${commentId}`).catch((err) => {
    throw new Error(err.response.data.msg);
  });
};
