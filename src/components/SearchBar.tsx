import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { mutate, data, isLoading } = useSearch();

  const handleSearch = () => {
    if (query.trim()) {
      mutate(query);
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex w-full max-w-xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar lugares turísticos..."
          className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-2 bg-primary text-white font-semibold rounded-r-md hover:bg-primary/80 transition"
        >
          Buscar
        </button>
      </div>

      {/* Resultados */}
      {isLoading && <p className="text-gray-200">Buscando...</p>}
      {data && (
        <div className="bg-white rounded-md shadow-md p-4 w-full max-w-xl text-left space-y-4">
          {data.map((place: any) => (
            <div key={place.id}>
              <h3 className="font-bold text-lg">{place.name}</h3>
              <p className="text-sm text-gray-600">{place.address}</p>
              <p className="text-yellow-600">⭐ {place.rating} ({place.totalReviews})</p>
              <p className="mt-1 text-gray-800">{place.aiSummary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
