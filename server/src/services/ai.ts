import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn("⚠️ No se encontró OPENAI_API_KEY en las variables de entorno");
}

const openai = new OpenAI({ apiKey });

/**
 * Resume reseñas con IA.
 * Devuelve pros, contras y recomendación en español.
 */
export async function summarizeReviews(reviews: string[]) {
  if (!reviews || reviews.length === 0) {
    return "No hay suficientes reseñas.";
  }

  try {
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un guía turístico que resume reseñas de lugares del Tolima.",
        },
        {
          role: "user",
          content: `Analiza estas reseñas y dame un resumen breve en español con:
- Pros (2-3 bullets)
- Contras (1-2 bullets)
- Recomendación final (1 línea)

Reseñas:\n\n${reviews.slice(0, 10).join("\n")}`
        },
      ],
    });

    return resp.choices[0]?.message?.content || "No fue posible generar resumen.";
  } catch (error) {
    console.error("❌ Error en OpenAI:", error);
    return "Error al generar resumen con IA.";
  }
}
