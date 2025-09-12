import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// Endpoint inteligente de búsqueda
app.post("/api/search", async (req, res) => {
  const { query } = req.body;

  try {
    // 1. Buscar lugares en Google Places
    const placesRes = await axios.get(
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

    const places = placesRes.data.results.slice(0, 5);

    // 2. Para cada lugar obtener detalles + reseñas
    const analyzedPlaces = await Promise.all(
      places.map(async (place: any) => {
        const detailRes = await axios.get(
          "https://maps.googleapis.com/maps/api/place/details/json",
          {
            params: {
              place_id: place.place_id,
              key: GOOGLE_API_KEY,
              language: "es",
              fields: "name,formatted_address,rating,user_ratings_total,reviews,geometry",
            },
          }
        );

        const details = detailRes.data.result;
        const reviews = details.reviews?.map((r: any) => r.text) || [];

        // 3. Pasar reseñas a IA
        let aiSummary = "No hay suficientes reseñas.";
        if (reviews.length > 0) {
          const aiRes = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {
                role: "system",
                content: "Eres un guía turístico que recomienda lugares en Tolima basándote en reseñas.",
              },
              {
                role: "user",
                content: `Analiza estas reseñas y dame un resumen de por qué recomendarías o no este lugar:\n\n${reviews.join("\n")}`,
              },
            ],
          });
          aiSummary = aiRes.choices[0].message?.content || aiSummary;
        }

        return {
          id: place.place_id,
          name: details.name,
          address: details.formatted_address,
          rating: details.rating,
          totalReviews: details.user_ratings_total,
          aiSummary,
          location: details.geometry.location,
        };
      })
    );

    res.json(analyzedPlaces);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar lugares" });
  }
});

app.listen(4000, () => {
  console.log("✅ Backend corriendo en http://localhost:4000");
});
