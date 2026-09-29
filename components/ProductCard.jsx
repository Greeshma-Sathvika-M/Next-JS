import Link from "next/link";

export default function ProductCard({ product }) {
  const { id, url, width, height, breeds } = product;

  const breedName = breeds && breeds.length > 0 ? breeds[0].name : "Unknown Breed";

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col h-full">
      {/* Cat Image */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {url ? (
          <img
            src={url}
            alt={breedName}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image
          </div>
        )}

        {/* Breed Badge */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-blue-500">
          {breedName}
        </div>
      </div>

      {/* Cat Info */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Image Dimensions */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {width} x {height}
        </p>

        {/* Breed Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {breedName}
        </h3>

        {/* Breed Description */}
        {breeds && breeds.length > 0 && breeds[0].description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
            {breeds[0].description}
          </p>
        )}

        {/* View Details Button */}
        <Link
          href={`/products/${id}`}
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
