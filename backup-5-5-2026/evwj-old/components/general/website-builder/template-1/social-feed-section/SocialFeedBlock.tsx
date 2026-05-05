"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { Tab, Tabs, TabList } from 'react-tabs'; // No longer need TabPanel
import 'react-tabs/style/react-tabs.css';
import {
  Twitter,
  Instagram,
  Linkedin,
  Search,
  Heart,
  MessageSquare,
  Share2,
  MoreHorizontal,
} from 'lucide-react';

// simple Facebook icon as SVG component
const FacebookIcon = (props: any) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2 6.34 2 2 6.48 2 12.07 2 17.08 5.66 21.2 10.44 22v-7.02H8.08v-2.9h2.36V9.41c0-2.33 1.38-3.62 3.5-3.62.99 0 1.98.18 1.98.18v2.18h-1.12c-1.1 0-1.44.69-1.44 1.4v1.67h2.46l-.39 2.9h-2.07V22C18.34 21.2 22 17.08 22 12.07z"/>
  </svg>
);

// --- Platform Icons Map ---
const platformIconMap: Record<string, { icon: React.ElementType; color: string }> = {
  Twitter: { icon: Twitter, color: 'text-[#1DA1F2]' },
  Instagram: { icon: Instagram, color: 'text-pink-600' },
  Linkedin: { icon: Linkedin, color: 'text-[#0A66C2]' },
  Facebook: { icon: FacebookIcon, color: 'text-[#1877F2]' },
};

const platformList = ['All Posts', 'Twitter', 'Facebook', 'Instagram', 'Linkedin'];

// --- Hashtag Component ---
const Hashtag = ({ text }: { text: string }) => {
  return (
    <span className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors cursor-pointer">
      {text}
    </span>
  );
};

export default function SocialFeedBlock({ data }: { data: any }) {
  const {
    title = 'Join the Conversation',
    subtitle = 'Follow us on social media for live updates',
    posts = [],
  } = data || {};

  const [filter, setFilter] = useState<string>('All Posts');
  const [query, setQuery] = useState<string>('');
  const [visible, setVisible] = useState<number>(4);

  const [localPosts, setLocalPosts] = useState<any[]>(() =>
    Array.isArray(posts) ? JSON.parse(JSON.stringify(posts)) : []
  );

  // This is the single source of truth for which posts to show.
  // It filters based on the 'filter' state (e.g., "Twitter") and 'query' state.
  const filteredPosts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return localPosts.filter((p) => {
      // This line filters by platform
      if (filter !== 'All Posts' && p.platform !== filter) return false;
      
      // This part filters by search query
      if (!q) return true;
      const searchableContent = `${p.author} ${p.handle} ${p.content} ${p.platform} ${p.hashtags ? p.hashtags.join(' ') : ''}`;
      return searchableContent.toLowerCase().includes(q);
    });
  }, [localPosts, filter, query]);

  // Reset visibility when filters change
  useEffect(() => {
    setVisible(4);
  }, [filter, query]);

  function toggleLike(postIndex: number) {
    const originalPost = filteredPosts[postIndex];
    if (!originalPost) return;
    const originalIndexInLocal = localPosts.findIndex(p => p.id === originalPost.id);
    if (originalIndexInLocal === -1) return;

    setLocalPosts((prevPosts) => {
      const nextPosts = [...prevPosts];
      const p = { ...nextPosts[originalIndexInLocal] };
      p._liked = !p._liked;
      p.likes = p._liked ? (p.likes || 0) + 1 : Math.max(0, (p.likes || 1) - 1);
      nextPosts[originalIndexInLocal] = p;
      return nextPosts;
    });
  }

  function incrementField(postIndex: number, field: 'comments' | 'shares') {
    const originalPost = filteredPosts[postIndex];
    if (!originalPost) return;
    const originalIndexInLocal = localPosts.findIndex(p => p.id === originalPost.id);
    if (originalIndexInLocal === -1) return;

    setLocalPosts((prevPosts) => {
      const nextPosts = [...prevPosts];
      const p = { ...nextPosts[originalIndexInLocal] };
      p[field] = (p[field] || 0) + 1;
      nextPosts[originalIndexInLocal] = p;
      return nextPosts;
    });
  }

  function loadMore() {
    setVisible((v) => v + 4);
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h3>
          {subtitle && (
            <p className="mt-2 text-md text-gray-600 dark:text-gray-300">{subtitle}</p>
          )}
        </div>

        {/* --- CONTROLLERS --- */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Tabs for md+ screens (Controller Only) */}
          <div className="hidden sm:block">
            <Tabs
              selectedIndex={Math.max(0, platformList.indexOf(filter))}
              onSelect={(index) => setFilter(platformList[index] || 'All Posts')}
            >
              <TabList className="flex flex-wrap gap-2" aria-label="Social platforms">
                {platformList.map((f) => (
                  <Tab
                    key={f}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200 bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700`}
                    selectedClassName={'bg-blue-600 text-white shadow-sm'}
                  >
                    {f}
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          </div>
          
          {/* Dropdown for small screens (Controller Only) */}
          <div className="sm:hidden w-full">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full rounded border px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
            >
              {platformList.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full sm:w-auto min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full pl-9 pr-3 py-2 text-sm rounded-full border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* --- POST LIST --- */}
        {/* This one section renders the posts for BOTH mobile and desktop */}
        <div className="space-y-6 mt-6">
          {filteredPosts.slice(0, visible).map((p: any, i: number) => {
            const PlatformIcon = platformIconMap[p.platform]?.icon;
            const platformColorClass = platformIconMap[p.platform]?.color || 'text-gray-500';
            const platformBg = p.platform === 'Twitter' ? 'bg-blue-50 dark:bg-blue-900/10' : p.platform === 'Facebook' ? 'bg-blue-50 dark:bg-blue-900/10' : p.platform === 'Linkedin' ? 'bg-[#eaf3ff] dark:bg-[#072741]' : 'bg-white dark:bg-gray-900';

            const contentWithHashtags = p.content.split(/(\#[a-zA-Z0-9_]+)/g).map((part: string, idx: number) => {
              if (part.startsWith('#')) {
                return <Hashtag key={idx} text={part} />;
              }
              return part;
            });

            return (
              <article key={p.id || i} className={`${platformBg} border border-gray-200 dark:border-gray-800 rounded-lg p-5 shadow-sm`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <img src={p.avatar || 'https://api.lorem.space/image/face?w=48&h=48'} alt={p.author} className="h-12 w-12 rounded-full object-cover border border-gray-100 dark:border-gray-700" />
                    <div>
                      <div className="flex items-center gap-1">
                        {PlatformIcon && <PlatformIcon className={`h-4 w-4 ${platformColorClass}`} />}
                        <span className="text-md font-semibold text-gray-900 dark:text-white">{p.author}</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{p.handle}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    {p.time}
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                </div>

                <p className="mt-4 text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                  {contentWithHashtags}
                </p>

                {p.image && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img src={p.image} alt="Post media" className="w-full h-auto object-cover" />
                  </div>
                )}

                {p.hashtags && p.hashtags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.hashtags.map((tag: string, tagIdx: number) => (
                      <span key={tagIdx} className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-full dark:bg-blue-900 dark:text-blue-300 cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-around text-gray-500 dark:text-gray-400">
                  <button onClick={() => toggleLike(i)} className={`flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${p._liked ? 'text-red-500' : ''}`} aria-label="Like">
                    <Heart className="h-5 w-5 fill-current" />
                    <span className="text-sm font-medium">{p.likes || 0}</span>
                  </button>

                  <button onClick={() => incrementField(i, 'comments')} className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Comment">
                    <MessageSquare className="h-5 w-5" />
                    <span className="text-sm font-medium">{p.comments || 0}</span>
                  </button>

                  <button onClick={() => incrementField(i, 'shares')} className="flex items-center gap-1 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Share">
                    <Share2 className="h-5 w-5" />
                    <span className="text-sm font-medium">{p.shares || 0}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
        
        {/* --- LOAD MORE / NO POSTS MESSAGES --- */}
        <div className="mt-8 text-center">
          {visible < filteredPosts.length && (
            <button
              onClick={loadMore}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-950 transition-colors"
            >
              Load More Posts
            </button>
          )}
          {visible >= filteredPosts.length && filteredPosts.length > 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No more posts to load.</p>
          )}
          {filteredPosts.length === 0 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">No posts found matching your criteria.</p>
          )}
        </div>
      </div>
    </section>
  );
}