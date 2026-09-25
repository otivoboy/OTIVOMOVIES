import React, { useEffect } from 'react';
import { Movie } from '../types/movie';

interface SEOHeadProps {
  title?: string;
  description?: string;
  movie?: Movie;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ title, description, movie }) => {
  const pageTitle = title ? `${title} — OTIVO MOVIES` : 'OTIVO MOVIES — Discover. Explore. Watch.';
  const pageDesc = description || (movie ? movie.overview : 'Discover, explore, and watch authorized free movies and TV shows on OTIVO Movies.');

  useEffect(() => {
    document.title = pageTitle;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDesc);
    }

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    }

    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', pageDesc);
    }

    // Inject JSON-LD Schema if movie exists
    const existingScript = document.getElementById('json-ld-schema');
    if (existingScript) {
      existingScript.remove();
    }

    if (movie) {
      const script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      
      const schemaData = movie.type === 'movie' ? {
        '@context': 'https://schema.org',
        '@type': 'Movie',
        'name': movie.title,
        'image': movie.poster,
        'description': movie.overview,
        'dateCreated': movie.releaseDate,
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': movie.rating,
          'bestRating': '10',
          'ratingCount': movie.voteCount
        },
        'genre': movie.genres
      } : {
        '@context': 'https://schema.org',
        '@type': 'TVSeries',
        'name': movie.title,
        'image': movie.poster,
        'description': movie.overview,
        'numberOfSeasons': movie.seasons?.length || 1,
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': movie.rating,
          'bestRating': '10',
          'ratingCount': movie.voteCount
        }
      };

      script.text = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }
  }, [pageTitle, pageDesc, movie]);

  return null;
};
