'use client';

import { useState, useEffect } from "react";

export default function CategoryFilter({ onCategoryChange, categories, isLoading }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    onCategoryChange(categoryId === selectedCategory ? null : categoryId);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Filter by Category</h3>

      {categories && categories.length > 0 ? (
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
              <input
                type="checkbox"
                checked={selectedCategory === category.id}
                onChange={() => handleCategoryChange(category.id)}
                className="w-4 h-4 text-blue-600 rounded cursor-pointer"
              />
              <span className="text-gray-700">{category.name}</span>
              <span className="text-gray-400 text-sm">({category.count})</span>
            </label>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories found</p>
      )}
    </div>
  );
}
