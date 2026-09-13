// src/hooks/useApplications.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/api.js";

// GET /api/applications returns a BARE ARRAY, so r.data is already the list —
// there is no envelope to unwrap.
export function useApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => api.get("/applications").then((r) => r.data),
    // Matches the 5-minute server-side TTL in server/CACHING.md, so the two
    // layers expire together instead of the client holding a longer copy.
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, patch }) =>
      api.patch(`/applications/${id}`, patch).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
}
