import { Router } from "express";
import { searchPlaces, getPlaceDetails } from "../services/places";
import { summarizeReviews } from "../services/ai";

const router = Router();

// Endpoint: Buscar lugares y resumir reseñas con IA
router.post("/", async (req, res) => {
  const { query } = req.body;

  try {
    console.log("🟢 [Search] Query recibida:", query);

    // 1. Buscar lugares en Google
    const places = await searchPlaces(query);
    console.log("🟡 [Search] Google Places devolvió:", places?.length, "resultados");

    if (!places || places.length === 0) {
      console.warn("⚠️ [Search] Google no devolvió resultados");
      return res.json([]);
    }

    const top = places.slice(0, 3); // limitar resultados iniciales
    console.log("🔵 [Search] Procesando top:", top.map((p: any) => p.name));

    // 2. Obtener detalles + reseñas + resumen IA
    const enriched = await Promise.all(
      top.map(async (place: any) => {
        const details = await getPlaceDetails(place.place_id);
        console.log("📍 [Details] Obtenido:", details?.name);

        const reviews = details.reviews?.map((r: any) => r.text) || [];
        console.log("✍️ [Reviews] Cantidad reseñas:", reviews.length);

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

    console.log("✅ [Search] Respuesta final:", enriched.length, "lugares");
    res.json(enriched);
  } catch (err) {
    console.error("❌ Error en /api/search:", err);
    res.status(500).json({ error: "Error en búsqueda" });
  }
});

export default router;

