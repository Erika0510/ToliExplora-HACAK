import { Router } from "express";
import { supabaseAdmin } from "../supabase";

const router = Router();

/**
 * Crear una reseña propia en la plataforma
 * El frontend debe enviar: { rating, comment, userId }
 */
router.post("/:placeId/reviews", async (req, res) => {
  const { placeId } = req.params;
  const { rating, comment, userId } = req.body;

  if (!rating || !userId) {
    return res.status(400).json({ error: "rating y userId son requeridos" });
  }

  const { error } = await supabaseAdmin.from("reviews").insert({
    place_id: placeId,
    rating,
    comment,
    user_id: userId,
  });

  if (error) {
    console.error("❌ Error insertando reseña:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ ok: true, message: "Reseña creada con éxito" });
});

/**
 * Listar reseñas propias de un lugar
 */
router.get("/:placeId/reviews", async (req, res) => {
  const { placeId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("rating, comment, created_at, user_id")
    .eq("place_id", placeId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error obteniendo reseñas:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

export default router;
