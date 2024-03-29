import axios from "axios";

export function getUserService(userId) {
  return axios.get(`/users/${userId}`);
}

export function followService(userId) {
  return axios.post(`/users/${userId}/follow`);
}

export function getUserPostsService({ userId, ...params }) {
  return axios.get(`/users/${userId}/posts`, {
    params,
  });
}

export function getUserLikesService({ userId, ...params }) {
  return axios.get(`/users/${userId}/likes`, {
    params,
  });
}
