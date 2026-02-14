import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type Memory, type InsertMemory } from "@shared/schema";

const STORAGE_KEY = "memories";

function getMemories(): Memory[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveMemories(memories: Memory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

export function useMemories() {
  return useQuery({
    queryKey: ["memories"],
    queryFn: async () => {
      return getMemories();
    },
  });
}

export function useCreateMemory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertMemory) => {
      const newMemory: Memory = {
        id: crypto.randomUUID(),
        ...data
      };

      const memories = getMemories();
      saveMemories([newMemory, ...memories]);

      return newMemory;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memories"] });
    },
  });
}