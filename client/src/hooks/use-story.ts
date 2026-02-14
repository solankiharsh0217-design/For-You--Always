import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { type StorySegment, type InsertStory } from "@shared/schema";

const STORAGE_KEY = "story";

function getStory(): StorySegment[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveStory(story: StorySegment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(story));
}

export function useStory() {
  return useQuery({
    queryKey: ["story"],
    queryFn: async () => {
      return getStory();
    },
  });
}

export function useCreateStorySegment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: InsertStory) => {
      const newSegment: StorySegment = {
        id: crypto.randomUUID(),
        ...data
      };

      const story = getStory();
      saveStory([...story, newSegment]);

      return newSegment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["story"] });
    },
  });
}