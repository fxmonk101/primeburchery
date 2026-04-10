import React from 'react';

const Article = ({ params }) => {
  const { slug } = params;

  return (
    <div>
      <h1>Article: {slug}</h1>
      {/* Fetch and display article content based on the slug */}
    </div>
  );
};

export async function getStaticPaths() {
  // Fetch article slugs here
  const paths = [
    // Example: { params: { slug: 'example-article' } },
  ];
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  // Fetch article data based on slug
  return { props: { slug } };
}

export default Article;
