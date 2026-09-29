'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductGrid from '@/components/ProductGrid';

export default function BreedsPage() {
  const [breeds, setBreeds] = useState([]);
  const [breedsLoading, setBreedsLoading] = useState(true);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setBreedsLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Failed to fetch breeds');
        const data = await response.json();
        setBreeds(data.slice(0, 10));
      } catch (err) {
        console.error('Error fetching breeds:', err);
        setError(err.message);
        setBreeds([]);
      } finally {
        setBreedsLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🐾 Cat Breeds
          </h1>
          <p className="text-gray-600">
            Explore different cat breeds and their characteristics
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breeds Grid */}
        {breedsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-700 font-semibold">Error</p>
            <p className="text-red-600">{error}</p>
          </div>
        ) : breeds.length === 0 ? (
          <div className="bg-gray-100 rounded-lg p-12 text-center">
            <p className="text-gray-600 text-lg">No breeds found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {breeds.map((breed) => (
              <Link
                key={breed.id}
                href={`/products/${breed.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition duration-300 overflow-hidden p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">{breed.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {breed.description || 'Beautiful and unique breed'}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-blue-50 rounded px-2 py-1">
                    <p className="text-gray-600">Origin</p>
                    <p className="font-semibold text-gray-900">{breed.origin || 'Unknown'}</p>
                  </div>
                  <div className="bg-green-50 rounded px-2 py-1">
                    <p className="text-gray-600">Lifespan</p>
                    <p className="font-semibold text-gray-900">{breed.life_span || 'N/A'} yrs</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-blue-600 font-semibold hover:text-blue-700">
                    View Gallery →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
