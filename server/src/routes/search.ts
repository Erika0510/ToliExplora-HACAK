import { Router } from "express";
// import { searchPlaces, getPlaceDetails } from "../services/places";  // 🔴 desactiva Google
// import { summarizeReviews } from "../services/ai";                  // 🔴 desactiva IA si no tienes tokens

const router = Router();

// Endpoint rápido de prueba
router.post("/", async (req, res) => {
  const { query } = req.body;

  console.log("🔍 Query recibida:", query);

  // Datos falsos para la demo
  const fakeResults = [
    {
      id: "1",
      name: "Nevado del Tolima",
      address: "Parque Nacional Natural Los Nevados, Tolima",
      rating: 4.8,
      totalReviews: 120,
      aiSummary: "Un lugar espectacular para hacer senderismo y disfrutar de la nieve.",
      location: { lat: 4.656, lng: -75.33 },
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Nevado_del_Tolima.jpg/320px-Nevado_del_Tolima.jpg",
    },
    {
      id: "2",
      name: "Cascada La Plata",
      address: "Planadas, Tolima",
      rating: 4.5,
      totalReviews: 80,
      aiSummary: "Una cascada impresionante rodeada de naturaleza.",
      location: { lat: 3.2, lng: -75.5 },
      photo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Cascada.jpg/320px-Cascada.jpg",
    },
  ];

  res.json(fakeResults);
});

export default router;
