import axios from "axios";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  console.warn("⚠️ No se encontró GOOGLE_API_KEY en las variables de entorno");
}

/**
 * Busca lugares en Google Places por texto.
 */
export async function searchPlaces(query: string) {
  const res = await axios.get(
    "https://maps.googleapis.com/maps/api/place/textsearch/json",
    {
      params: {
        query,
        key: GOOGLE_API_KEY,
        language: "es",
        region: "co",
      },
    }
  );
  return res.data.results;
}

/**
 * Obtiene detalles de un lugar (incluye reseñas).
 */
export async function getPlaceDetails(placeId: string) {
  const res = await axios.get(
    "https://maps.googleapis.com/maps/api/place/details/json",
    {
      params: {
        place_id: placeId,
        key: GOOGLE_API_KEY,
        language: "es",
        fields:
          "name,formatted_address,rating,user_ratings_total,reviews,geometry",
      },
    }
  );
  return res.data.result;
}
