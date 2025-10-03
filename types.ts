
export interface Idea {
  ideaTitle: string;
  caption: string;
  hashtags: string[];
  visualSuggestion: string;
  imageUrl?: string;
}

export interface FormData {
  productName: string;
  targetAudience: string;
  marketingGoal: string;
  platform: string;
  tone: string;
  visualStyle: string;
}

export const MARKETING_GOALS = [
  "Increase Brand Awareness",
  "Drive Sales",
  "Boost Engagement",
  "Generate Leads",
  "Build Community"
];

export const PLATFORMS = [
  "Instagram",
  "Facebook",
  "X (Twitter)",
  "LinkedIn",
  "TikTok"
];

export const TONES = [
  "Professional",
  "Playful",
  "Informative",
  "Urgent"
];

export const VISUAL_STYLES = [
  "Photography",
  "Illustration",
  "Graphic Design",
  "Cinematic",
  "Minimalist"
];
