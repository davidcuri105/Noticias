import React, { useEffect, useState } from 'react';
import { getNews } from './services/newsService';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews(category);
      setNews(data);
    };
    fetchNews();
  }, [category]);

  return (
    <div>
      <h1>📰 Noticias</h1>
      
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="general">General</option>
        <option value="business">Negocios</option>
        <option value="sports">Deportes</option>
        <option value="technology">Tecnología</option>
      </select>

      <ul>
        {news.map((article, index) => (
          <li key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Leer más
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
