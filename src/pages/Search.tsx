import { useState } from "react";
import axios from "axios";

interface Place {
  id: string;
  name: string;
  address: string;
  rating: number;
  totalReviews: number;
  aiSummary: string;
  photoUrl?: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/search`,
        { query }
      );
      console.log("Resultados API:", res.data);
      setResults(res.data || []);
    } catch (err) {
      console.error("❌ Error en búsqueda:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buscador Inteligente</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ej: Nevado del Tolima"
          className="border rounded p-2 flex-grow"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* ✅ Mostrar resultados */}
      {results.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-4">
          {results.map((place) => (
            <div
              key={place.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              {/* Imagen si existe */}
              {place.photoUrl && (
                <img
                  src={place.photoUrl}
                  alt={place.name}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h2 className="text-xl font-semibold">{place.name}</h2>
              <p className="text-sm text-gray-600">{place.address}</p>
              <p className="text-yellow-600 font-medium">
                ⭐ {place.rating} ({place.totalReviews} reseñas)
              </p>
              <p className="mt-2 text-gray-800">{place.aiSummary}</p>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-gray-500">No hay resultados</p>
      )}
    </div>
  );
}
