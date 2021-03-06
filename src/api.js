import axios from 'axios';

const newsApi = axios.create({
  baseURL: 'https://ellen-nc-news.herokuapp.com/api',
});

export const fetchArticles = (topic, sortBy, order) => {
  return newsApi
    .get('/articles', {
      params: { topic: topic, sort_by: sortBy, order: order },
    })
    .then(({ data: { articles } }) => {
      return articles;
    })
    .catch((err) => {
      throw new Error(err.response.data.msg);
    });
};

export const updateVotes = (article_id, change) => {
  return newsApi
    .patch(`/articles/${article_id}`, {
      inc_votes: change,
    })
    .catch((err) => {
      throw new Error(err.response.data.msg);
    });
};

export const updateCommentVotes = (comment_id, change) => {
  return newsApi
    .patch(`/comments/${comment_id}`, {
      inc_votes: change,
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

export const fetchSingleComment = (comment_id) => {
  return newsApi
    .get(`/comments/${comment_id}`)
    .then(({ data: { comment } }) => {
      return comment;
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
