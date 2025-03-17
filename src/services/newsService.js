import axios from 'axios';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

export const getNews = async (category = 'general') => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        country: 'us', 
        category,
        apiKey: API_KEY,
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Error obteniendo noticias:', error);
    return [];
  }
};
