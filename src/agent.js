import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
// import { request } from 'https';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(res => res.body),
  post: (url, body) => 
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(res => res.body),
  put: (url, body) => 
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(res => res.body),
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(res => res.body)
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const encode = encodeURIComponent;

const Articles = {
  all: page =>
    requests.get(`/articles?${limit(10, page)}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(10, page)}`),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(10, page)}`),
  feed: (page) =>
    requests.get(`/articles/feed?${limit(10, page)}`),
  get: slug =>
    requests.get(`/articles/${slug}`)
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) => 
    requests.del(`/article/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};

const Auth = {
  login: (email, password) =>
    requests.post('/users/login', { user: { email, password } }),
  current: () => 
    requests.get('/user'),
  register: (username, email, password) =>  
    requests.post('/users', { user: { username, email, password } }),
  save: user =>
    requests.put('/user', { user })
}; 

const Profile = {
  follow: username =>
    requests.post(`/profiles/${username}/follow`),
  get: username =>
    requests.get(`/profiles/${username}`),
  unfollow: username =>
    requests.del(`/profiles/${username}/follow`)
};

const Tags = {
  getAll: () => requests.get(`/tags`)
}

export default {
  Articles,
  Auth,
  Tags,
  Comments,
  Profile,
  setToken: _token => { token = _token; }
};
