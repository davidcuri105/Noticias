import React, { useEffect, useState } from 'react';
import { getNews } from './services/newsService';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getNews(category, searchQuery);
        setNews(data);
      } catch (error) {
        setError('No se pudieron cargar las noticias. Intenta de nuevo más tarde.');
      }
      setLoading(false);
    };
    fetchNews();
  }, [category, searchQuery]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>📰 Noticias</h1>

        {/* Barra de búsqueda */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar noticias..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Filtro de categorías */}
        <select
          onChange={(e) => setCategory(e.target.value)}
          value={category}
          className="category-select"
        >
          <option value="general">General</option>
          <option value="business">Negocios</option>
          <option value="sports">Deportes</option>
          <option value="technology">Tecnología</option>
        </select>
      </header>

      {/* Mensaje de error o carga */}
      {loading && <p className="loading-message">Cargando noticias...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="news-list">
        {news.length === 0 && !loading ? (
          <p className="no-results">No se encontraron noticias para esta búsqueda.</p>
        ) : (
          news.map((article, index) => (
            <div key={index} className="news-card">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Leer más
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
