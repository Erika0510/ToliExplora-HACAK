import { Router } from "express";
import { supabaseAdmin } from "../supabase";

const router = Router();

// Crear reseña
router.post("/:placeId/reviews", async (req, res) => {
  const { placeId } = req.params;
  const { rating, comment, userId } = req.body; // el frontend envía userId

  const { error } = await supabaseAdmin.from("reviews").insert({
    place_id: placeId,
    rating,
    comment,
    user_id: userId
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

// Listar reseñas
router.get("/:placeId/reviews", async (req, res) => {
  const { placeId } = req.params;
  const { data, error } = await supabaseAdmin
    .from("reviews")
    .select("rating, comment, created_at, user_id")
    .eq("place_id", placeId)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
