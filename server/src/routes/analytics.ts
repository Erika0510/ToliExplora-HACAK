import { Router } from "express";
import { supabaseAdmin } from "../supabase";

const router = Router();

// Registrar evento
router.post("/", async (req, res) => {
  const { subjectType, subjectId, event, userId, meta } = req.body;

  const { error } = await supabaseAdmin.from("analytics").insert({
    subject_type: subjectType,
    subject_id: subjectId,
    event,
    user_id: userId,
    meta
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ ok: true });
});

export default router;
