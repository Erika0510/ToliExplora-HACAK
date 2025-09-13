import { useState } from "react";
import { useSearch } from "../hooks/useSearch";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const { mutate, data, isLoading, error } = useSearch();

  const handleSearch = () => {
    if (query.trim()) {
      mutate(query);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buscador Inteligente</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar lugares turísticos..."
          className="border p-2 flex-1 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {isLoading && <p className="mt-4">🔍 Buscando...</p>}
      {error && <p className="mt-4 text-red-500">❌ Error en la búsqueda</p>}

      {data && (
        <div className="mt-6 space-y-4">
          {data.map((place: any) => (
            <div
              key={place.id}
              className="p-4 border rounded shadow-sm bg-white"
            >
              <h2 className="text-xl font-semibold">{place.name}</h2>
              <p className="text-gray-600">{place.address}</p>
              <p className="text-yellow-600">
                ⭐ {place.rating} ({place.totalReviews} reseñas)
              </p>
              <p className="mt-2">{place.aiSummary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
