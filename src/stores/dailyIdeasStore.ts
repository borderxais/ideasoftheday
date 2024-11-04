import { create } from 'zustand';

interface DailyIdea {
  title: string;
  description: string;
  targetAudience: string;
  contentFormat: string;
  engagementPotential: string;
  hashtags: string[];
  bestTimeToPost: string;
  visualStyle: string;
}

interface DailyIdeasState {
  dailyIdeas: DailyIdea[] | null;
  loading: boolean;
  error: string | null;
  fetchDailyIdeas: () => Promise<void>;
}

export const useDailyIdeasStore = create<DailyIdeasState>((set) => ({
  dailyIdeas: null,
  loading: false,
  error: null,
  fetchDailyIdeas: async () => {
    try {
      set({ loading: true, error: null });
      const response = await fetch('/api/content/daily-ideas');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.success || !data.ideas || !Array.isArray(data.ideas) || data.ideas.length === 0) {
        throw new Error('Invalid response format or no ideas available');
      }
      
      // Validate each idea has required fields
      const validatedIdeas = data.ideas.map((idea: any) => {
        if (!idea.title || !idea.description || !idea.targetAudience || 
            !idea.contentFormat || !idea.engagementPotential || !idea.hashtags || 
            !idea.bestTimeToPost || !idea.visualStyle) {
          throw new Error('Invalid idea format: missing required fields');
        }
        return idea;
      });

      set({ dailyIdeas: validatedIdeas, loading: false });
    } catch (error) {
      console.error('Error fetching daily ideas:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch daily ideas',
        loading: false,
        dailyIdeas: null
      });
    }
  },
}));