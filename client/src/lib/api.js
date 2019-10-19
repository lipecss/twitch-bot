import axios from 'axios';
import API_URL from '../API_URL';

const apiBase = `${API_URL}/api`;

function getUser() {
  if (!localStorage.token) {
    return null;
  }
  const token = localStorage.token
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  return JSON.parse(atob(token.split('.')[1]));
}

function getDefaultHeaders() {
  return {
    Authorization: `Bearer ${localStorage.token}`,
  };
}

const api = axios.create({
  baseURL: apiBase,
});

export async function getChannel() {
  const { twitchId } = getUser();
  const { data } = await api.get(`/channel/${twitchId}`, {
    headers: getDefaultHeaders(),
  });
  return data;
}

export async function updateChannel({ enabled }) {
  const { twitchId } = getUser();
  const { data } = await api.patch(`/channel/${twitchId}`, {
    enabled,
  }, {
    headers: getDefaultHeaders(),
  });
  return data;
}
