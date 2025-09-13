import { Router } from "express";
import { supabaseAdmin } from "../supabase";

const router = Router();

/**
 * Crear un negocio para un empresario
 */
router.post("/", async (req, res) => {
  const { userId, name, description, category, municipality } = req.body;

  if (!userId || !name || !category || !municipality) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  if (!["hotel", "restaurant", "agency"].includes(category)) {
    return res.status(400).json({ error: "Categoría inválida" });
  }

  // Verificar si el usuario es empresario
  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("user_type")
    .eq("user_id", userId)
    .single();

  if (profileError) {
    return res.status(500).json({ error: "Error verificando perfil" });
  }

  if (profile?.user_type !== "Empresario") {
    return res.status(403).json({ error: "Solo empresarios pueden registrar negocios" });
  }

  // Crear negocio
  const { data, error } = await supabaseAdmin
    .from("businesses")
    .insert({
      user_id: userId,
      name,
      description,
      category,
      municipality,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json({ ok: true, business: data });
});

export default router;
