// src/lib/api.ts
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function searchPlaces(query: string) {
  const res = await fetch(`${API_URL}/api/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    throw new Error("Error al buscar lugares");
  }

  return res.json();
}
