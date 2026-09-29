'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function CatDetails() {
  const params = useParams();
  const [cat, setCat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/products/${params.id}`);
        if (!response.ok) throw new Error('Cat not found');
        const data = await response.json();
        setCat(data);
      } catch (err) {
        console.error('Error fetching cat:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchCat();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6 inline-block"
        >
          ← Back to Gallery
        </Link>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700 font-semibold">Error</p>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!cat) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-semibold mb-6 inline-block"
        >
          ← Back to Gallery
        </Link>
        <p className="text-gray-600">Cat not found</p>
      </div>
    );
  }

  const {
    id,
    url,
    width,
    height,
    breeds,
  } = cat;

  const breedData = breeds && breeds.length > 0 ? breeds[0] : null;
  const breedName = breedData?.name || 'Unknown Breed';
  const breedTemperament = breedData?.temperament || 'N/A';
  const breedOrigin = breedData?.origin || 'Unknown';
  const breedIntelligence = breedData?.intelligence || 'N/A';
  const breedDescription = breedData?.description || 'No description available';
  const breedWeightMin = breedData?.weight?.metric?.split(' - ')[0] || 'N/A';
  const breedWeightMax = breedData?.weight?.metric?.split(' - ')[1] || '';
  const breedLifespan = breedData?.life_span || 'N/A';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 font-semibold mb-8 inline-block"
        >
          ← Back to Gallery
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
            {/* Image Section */}
            <div>
              <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
                {url ? (
                  <img
                    src={url}
                    alt={breedName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <p>Image Size: {width} x {height}px</p>
                <p>Image ID: {id}</p>
              </div>
            </div>

            {/* Breed Info Section */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                🐱 {breedName}
              </h1>

              {/* Origin */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm font-semibold text-gray-900">
                  Origin: <span className="font-normal">{breedOrigin}</span>
                </p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 uppercase mb-2">Lifespan</p>
                  <p className="text-lg font-semibold text-gray-900">{breedLifespan} years</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-xs text-gray-600 uppercase mb-2">Weight</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {breedWeightMin} {breedWeightMax && '- ' + breedWeightMax} kg
                  </p>
                </div>
              </div>

              {/* Temperament */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">Temperament</p>
                <p className="text-gray-600">{breedTemperament}</p>
              </div>

              {/* Intelligence */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">Intelligence Level</p>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        star <= breedIntelligence ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this breed</h3>
                <p className="text-gray-600 leading-relaxed">{breedDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
