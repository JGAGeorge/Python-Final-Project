import axios from 'axios';

const api = axios.create({
  baseURL: 'https://python-final-project-8llplofvg-jgageorges-projects.vercel.app/api/',
});

export default api;