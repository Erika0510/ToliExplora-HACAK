import { Router } from "express";
import { supabaseAdmin } from "../supabase";

const router = Router();

/**
 * Guardar un evento de analítica
 * Espera body: { subjectType, subjectId, event, userId?, meta? }
 */
router.post("/", async (req, res) => {
  const { subjectType, subjectId, event, userId, meta } = req.body;

  if (!subjectType || !subjectId || !event) {
    return res.status(400).json({ error: "Faltan parámetros obligatorios" });
  }

  const { error } = await supabaseAdmin.from("analytics").insert({
    subject_type: subjectType,
    subject_id: subjectId,
    event,
    user_id: userId || null,
    meta: meta || {},
  });

  if (error) {
    console.error("❌ Error insertando métrica:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json({ ok: true, message: "Evento registrado" });
});

/**
 * Obtener métricas (ejemplo simple, solo para debug/test)
 * /api/analytics/:subjectId
 */
router.get("/:subjectId", async (req, res) => {
  const { subjectId } = req.params;

  const { data, error } = await supabaseAdmin
    .from("analytics")
    .select("event, created_at, user_id, meta")
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Error leyendo métricas:", error);
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

export default router;

