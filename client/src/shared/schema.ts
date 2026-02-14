export interface Memory {
  id: string | number;
  url: string;
  type: "image" | "video";
  caption: string;
  date?: string;
  rotation?: number;
}

export interface StorySegment {
  id: string | number;
  title: string;
  content: string;
  imageUrl?: string;
  order: number;
}

export type InsertMemory = Omit<Memory, "id">;
export type InsertStory = Omit<StorySegment, "id">;
