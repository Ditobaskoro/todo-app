const API_URL = 'http://pomonatodo.herokuapp.com';

const request = (method, url, data) => {
  const body = JSON.stringify(data);
  const headers = {
    'Content-Type': 'application/json'
  }

  const auth = localStorage.getItem('auth');

  if (auth) {
    headers.Authorization = auth;
  }

  return fetch(`${API_URL}/${url}`, { method, headers, body })
    .then(res => {
      return res
    })
    .catch(err => {
      console.log(err.message)
    });
}

const get = (url, data) => request('GET', url, data);
const post = (url, data) => request('POST', url, data);
const put = (url, data) => request('PUT', url, data);
const remove = (url, data) => request('DELETE', url, data);

const api = {
  todo: {
    list: (query, filter) => get(`todo/user?q=${query}&filter=${filter}`),
    add: (title, priority, note) =>
      post('todo', {
        title,
        priority,
        note,
      }),
    detail: id => get(`todo/${id}`),
    remove: id => remove(`todo/${id}`),
    edit: (id, title, priority, note) =>
      put(`todo/${id}`, {
        title,
        priority,
        note
      }),
    complete: (id, isDone) =>
      put(`todo/${id}`, {
        isDone
      }),
    register: (name, email, password) =>
      post('auth/register', {
        name,
        email,
        password
      }),
    login: (email, password) =>
      post('auth/login', {
        email,
        password
      })
  }
}

export default api;
