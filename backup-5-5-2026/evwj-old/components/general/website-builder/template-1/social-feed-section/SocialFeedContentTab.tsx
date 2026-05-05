import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Share2, Heart, MessageCircle, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SocialFeedData {
  title: string;
  subtitle: string;
  posts: Array<{
    author: string;
    handle: string;
    time: string;
    platform: string;
    avatar: string;
    content: string;
    likes: number;
    comments: number;
    shares: number;
  }>;
}

interface SocialFeedContentTabProps {
  data: SocialFeedData;
  onChange: (data: SocialFeedData) => void;
}

export default function SocialFeedContentTab({ data, onChange }: SocialFeedContentTabProps) {
  const [selectedPlatform, setSelectedPlatform] = React.useState<string>('All Posts');
  const platformOptions = ['Twitter', 'Facebook', 'Instagram', 'Linkedin'];
  const tabList = ['All Posts', ...platformOptions];

  const updatePost = (idx: number, patch: Partial<SocialFeedData['posts'][0]>) => {
    const updatedPosts = data.posts.map((p, i) => (i === idx ? { ...p, ...patch } : p));
    onChange({ ...data, posts: updatedPosts });
  };

  const addPost = () => {
    const defaultPlatform = selectedPlatform === 'All Posts' ? 'Twitter' : (selectedPlatform || 'Twitter');
    const newPost = {
      author: 'New Author',
      handle: '@username',
      time: '1 hour ago',
      platform: defaultPlatform,
      avatar: '',
      content: 'New post content...',
      likes: 0,
      comments: 0,
      shares: 0,
    };
    onChange({ ...data, posts: [...data.posts, newPost] });
  };

  const removePost = (idx: number) => {
    const updatedPosts = data.posts.filter((_, i) => i !== idx);
    onChange({ ...data, posts: updatedPosts });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return <Twitter className="h-4 w-4" />;
      case 'Facebook':
        return <Facebook className="h-4 w-4" />;
      case 'Instagram':
        return <Instagram className="h-4 w-4" />;
      case 'Linkedin':
        return <Linkedin className="h-4 w-4" />;
      default:
        return <Share2 className="h-4 w-4" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Twitter':
        return 'bg-blue-500';
      case 'Facebook':
        return 'bg-blue-600';
      case 'Instagram':
        return 'bg-pink-500';
      case 'Linkedin':
        return 'bg-blue-700';
      default:
        return 'bg-gray-500';
    }
  };

  const filteredPosts = selectedPlatform === 'All Posts' 
    ? data.posts 
    : data.posts.filter(p => p.platform === selectedPlatform);

  return (
    <div className="space-y-6">
      {/* Preview Section */}
      <div className="rounded-lg border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Share2 className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              {data.title || 'Join the Conversation'}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.subtitle || 'Follow us on social media for live updates'}
            </p>
          </div>
        </div>

        <div className="grid gap-3">
          {filteredPosts.length > 0 ? (
            filteredPosts.slice(0, 2).map((post, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-950 rounded-lg border p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {post.avatar ? (
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full ${getPlatformColor(post.platform)} flex items-center justify-center text-white font-semibold`}>
                        {post.author ? post.author.charAt(0).toUpperCase() : '?'}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                        {post.author || 'Author'}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {post.handle || '@handle'}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {post.time || 'Just now'}
                      </span>
                      <div className={`ml-auto p-1 ${getPlatformColor(post.platform)} rounded`}>
                        <div className="text-white">
                          {getPlatformIcon(post.platform)}
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {post.content || 'Post content...'}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {post.likes || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.comments || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        {post.shares || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 bg-white dark:bg-slate-950 rounded-lg border">
              No posts added yet
            </div>
          )}
          {filteredPosts.length > 2 && (
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              +{filteredPosts.length - 2} more posts
            </p>
          )}
        </div>
      </div>

      {/* Section Header */}
      <div className="space-y-4 rounded-lg border p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Section Header</h3>
        
        <div className="space-y-2">
          <Label htmlFor="social-title">Title</Label>
          <Input
            id="social-title"
            value={data.title}
            onChange={(e) => onChange({ ...data, title: e.target.value })}
            placeholder="Join the Conversation"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="social-subtitle">Subtitle</Label>
          <Input
            id="social-subtitle"
            value={data.subtitle}
            onChange={(e) => onChange({ ...data, subtitle: e.target.value })}
            placeholder="Follow us on social media for live updates"
          />
        </div>
      </div>

      {/* Social Posts Management */}
      <div className="space-y-4 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Social Media Posts</h3>
          <Button
            type="button"
            onClick={addPost}
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Post
          </Button>
        </div>

        {/* Platform Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabList.map((tab) => (
            <Button
              key={tab}
              type="button"
              variant={selectedPlatform === tab ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPlatform(tab)}
              className="gap-2"
            >
              {tab !== 'All Posts' && getPlatformIcon(tab)}
              {tab}
            </Button>
          ))}
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {data.posts.map((post, idx) => {
            if (selectedPlatform !== 'All Posts' && post.platform !== selectedPlatform) return null;
            
            return (
              <div key={idx} className="rounded-lg border bg-slate-50 dark:bg-slate-900 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Post {idx + 1}
                    </span>
                    <Badge variant="secondary" className="gap-1">
                      {getPlatformIcon(post.platform)}
                      {post.platform}
                    </Badge>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePost(idx)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`post-author-${idx}`}>Author Name</Label>
                    <Input
                      id={`post-author-${idx}`}
                      value={post.author}
                      onChange={(e) => updatePost(idx, { author: e.target.value })}
                      placeholder="Sarah Johnson"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`post-handle-${idx}`}>Handle</Label>
                    <Input
                      id={`post-handle-${idx}`}
                      value={post.handle}
                      onChange={(e) => updatePost(idx, { handle: e.target.value })}
                      placeholder="@sarahjdev"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`post-time-${idx}`}>Time</Label>
                    <Input
                      id={`post-time-${idx}`}
                      value={post.time}
                      onChange={(e) => updatePost(idx, { time: e.target.value })}
                      placeholder="2 hours ago"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`post-platform-${idx}`}>Platform</Label>
                    <Select
                      value={post.platform}
                      onValueChange={(value) => updatePost(idx, { platform: value })}
                    >
                      <SelectTrigger id={`post-platform-${idx}`}>
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        {platformOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            <div className="flex items-center gap-2">
                              {getPlatformIcon(option)}
                              {option}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`post-avatar-${idx}`}>Avatar URL (optional)</Label>
                    <Input
                      id={`post-avatar-${idx}`}
                      value={post.avatar}
                      onChange={(e) => updatePost(idx, { avatar: e.target.value })}
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`post-content-${idx}`}>Post Content</Label>
                  <Textarea
                    id={`post-content-${idx}`}
                    value={post.content}
                    onChange={(e) => updatePost(idx, { content: e.target.value })}
                    placeholder="Write the post content here..."
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor={`post-likes-${idx}`} className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      Likes
                    </Label>
                    <Input
                      id={`post-likes-${idx}`}
                      type="number"
                      min="0"
                      value={post.likes}
                      onChange={(e) => updatePost(idx, { likes: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`post-comments-${idx}`} className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      Comments
                    </Label>
                    <Input
                      id={`post-comments-${idx}`}
                      type="number"
                      min="0"
                      value={post.comments}
                      onChange={(e) => updatePost(idx, { comments: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`post-shares-${idx}`} className="flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Shares
                    </Label>
                    <Input
                      id={`post-shares-${idx}`}
                      type="number"
                      min="0"
                      value={post.shares}
                      onChange={(e) => updatePost(idx, { shares: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          {data.posts.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Share2 className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No social posts added yet</p>
              <p className="text-xs mt-1">Click "Add Post" to create your first social media post</p>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400">
          These posts are for preview purposes only. They help showcase social media engagement on your event page.
        </p>
      </div>
    </div>
  );
}
