import { Heart, Building2, Cake, Music, Users, Trophy, BookOpen, Coffee, Sparkles, Briefcase } from "lucide-react";

export const mockSocialUsers = {
  google: {
    id: 'google_' + Date.now(),
    name: 'Sarah Johnson',
    email: 'sarah.johnson@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    provider: 'google' as const,
    needsOnboarding: true
  },
  microsoft: {
    id: 'ms_' + Date.now(),
    name: 'Michael Chen',
    email: 'michael.chen@outlook.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
    provider: 'microsoft' as const,
    needsOnboarding: true
  },
  apple: {
    id: 'apple_' + Date.now(),
    name: 'Emma Davis',
    email: 'emma.davis@icloud.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    provider: 'apple' as const,
    needsOnboarding: true
  },
  github: {
    id: 'github_' + Date.now(),
    name: 'Alex Thompson',
    email: 'alex.thompson@github.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    provider: 'github' as const,
    needsOnboarding: true
  },
  linkedin: {
    id: 'linkedin_' + Date.now(),
    name: 'Jordan Williams',
    email: 'jordan.williams@company.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    provider: 'linkedin' as const,
    needsOnboarding: true
  }
};

export const eventInterestOptions = [
  { id: 'weddings', label: 'Weddings & Engagements', icon: Heart, gradient: 'from-pink-500 to-rose-500' },
  { id: 'corporate', label: 'Corporate Events', icon: Building2, gradient: 'from-blue-500 to-cyan-500' },
  { id: 'birthdays', label: 'Birthday Parties', icon: Cake, gradient: 'from-yellow-500 to-orange-500' },
  { id: 'festivals', label: 'Festivals & Concerts', icon: Music, gradient: 'from-purple-500 to-pink-500' },
  { id: 'fundraisers', label: 'Fundraisers & Charity', icon: Heart, gradient: 'from-green-500 to-emerald-500' },
  { id: 'networking', label: 'Networking Events', icon: Users, gradient: 'from-indigo-500 to-blue-500' },
  { id: 'sports', label: 'Sports Events', icon: Trophy, gradient: 'from-orange-500 to-red-500' },
  { id: 'workshops', label: 'Educational Workshops', icon: BookOpen, gradient: 'from-teal-500 to-cyan-500' },
  { id: 'social', label: 'Social Gatherings', icon: Coffee, gradient: 'from-amber-500 to-yellow-500' },
  { id: 'conferences', label: 'Conferences & Trade Shows', icon: Briefcase, gradient: 'from-slate-500 to-gray-600' },
  { id: 'other', label: 'Other', icon: Sparkles, gradient: 'from-gray-500 to-slate-500' }
];
