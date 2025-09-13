import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!; // 🔑 clave secreta de servicio

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  throw new Error(
    "Faltan variables de entorno SUPABASE_URL, SUPABASE_ANON_KEY o SUPABASE_SERVICE_KEY"
  );
}

// Cliente público (usuarios normales)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente admin (solo backend, más permisos)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
