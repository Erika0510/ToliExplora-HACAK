import { Router } from "express";
import { searchPlaces, getPlaceDetails } from "../services/places";
import { summarizeReviews } from "../services/ai";

const router = Router();

// Endpoint: Buscar lugares y resumir reseñas con IA
router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    // 1. Buscar lugares en Google
    const places = await searchPlaces(query);
    const top = places.slice(0, 3); // limitar resultados iniciales

    // 2. Obtener detalles + reseñas + resumen IA
    const enriched = await Promise.all(
      top.map(async (place: any) => {
        const details = await getPlaceDetails(place.place_id);
        const reviews = details.reviews?.map((r: any) => r.text) || [];
        const aiSummary = await summarizeReviews(reviews);

        return {
          id: place.place_id,
          name: details.name,
          address: details.formatted_address,
          rating: details.rating,
          totalReviews: details.user_ratings_total,
          aiSummary,
          location: details.geometry?.location,
        };
      })
    );

    res.json(enriched);
  } catch (err) {
    console.error("❌ Error en /api/search:", err);
    res.status(500).json({ error: "Error en búsqueda" });
  }
});

export default router;
