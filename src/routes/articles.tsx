import React from 'react';

const Articles = () => {
  // Example articles data
  const articles = [
    { id: 1, title: 'Article One', content: 'Content for article one.' },
    { id: 2, title: 'Article Two', content: 'Content for article two.' },
    { id: 3, title: 'Article Three', content: 'Content for article three.' },
  ];

  return (
    <div>
      <h1>Articles Listing</h1>
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
