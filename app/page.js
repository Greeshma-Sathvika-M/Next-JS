'use client';

import { useState, useEffect } from 'react';
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/products?page=${page}&limit=12`);
        if (!response.ok) throw new Error('Failed to fetch cats');

        const data = await response.json();
        setCats(data);
      } catch (err) {
        console.error('Error fetching cats:', err);
        setError(err.message);
        setCats([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCats();
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🐱 Cat Gallery
          </h1>
          <p className="text-gray-600">
            Discover beautiful cat breeds from The Cat API
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cats Grid */}
        <ProductGrid
          products={cats}
          isLoading={isLoading}
          error={error}
        />

        {/* Load More Button */}
        {!isLoading && cats.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Load More Cats
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
