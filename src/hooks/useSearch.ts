// src/hooks/useSearch.ts
import { useMutation } from "@tanstack/react-query";
import { searchPlaces } from "../lib/api";

export function useSearch() {
  return useMutation({
    mutationFn: (query: string) => searchPlaces(query),
  });
}
