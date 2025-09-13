import { useState } from "react";
import { useSearch } from "../hooks/useSearch";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { mutate, data, isLoading } = useSearch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      mutate(query);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      {/* Barra de búsqueda */}
      <div className="flex w-full max-w-2xl shadow-md rounded-md overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔍 Buscar lugares turísticos..."
          className="flex-1 px-4 py-3 text-lg border-none focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-primary text-white font-semibold hover:bg-primary/80 transition"
        >
          Buscar
        </button>
      </div>

      {/* Resultados */}
      {isLoading && <p className="text-gray-500">Buscando...</p>}

      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl">
          {data.slice(0, 3).map((place: any) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
            >
              {/* Imagen del lugar */}
              {place.photos?.[0] ? (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`}
                  alt={place.name}
                  className="w-full h-40 object-cover"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                  Sin imagen
                </div>
              )}

              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.address}</p>
                <p className="text-yellow-600">
                  ⭐ {place.rating} ({place.totalReviews})
                </p>
                <p className="mt-2 text-gray-800 line-clamp-3">
                  {place.aiSummary}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Ver más resultados */}
      {data && data.length > 3 && (
        <button
          onClick={() => navigate(`/search?query=${encodeURIComponent(query)}`)}
          className="mt-4 px-6 py-2 bg-secondary text-white rounded hover:bg-secondary/80"
        >
          Ver más resultados →
        </button>
      )}
    </div>
  );
};

export default SearchBar;
