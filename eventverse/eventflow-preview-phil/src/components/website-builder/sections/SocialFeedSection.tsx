import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Instagram, Linkedin, Heart, MessageCircle, Repeat2, ExternalLink } from "lucide-react";

interface SocialPost {
  id: string;
  platform: 'twitter' | 'instagram' | 'linkedin';
  author: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares?: number;
  image?: string;
  hashtags: string[];
}

interface SocialFeedSectionProps {
  title?: string;
  description?: string;
  hashtag?: string;
  platforms?: ('twitter' | 'instagram' | 'linkedin')[];
  style?: React.CSSProperties;
}

const mockPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'twitter',
    author: 'Sarah Johnson',
    handle: '@sarahjdev',
    content: 'Amazing keynote at #TechConf2024! The future of AI looks incredibly promising. Can\'t wait for the workshop sessions tomorrow! 🚀',
    timestamp: '2 hours ago',
    likes: 42,
    comments: 8,
    shares: 12,
    hashtags: ['TechConf2024', 'AI', 'Innovation']
  },
  {
    id: '2',
    platform: 'instagram',
    author: 'Mike Chen',
    handle: '@mikechenphoto',
    content: 'The networking lunch was fantastic! Met so many inspiring people from different industries. #TechConf2024 #Networking',
    timestamp: '4 hours ago',
    likes: 89,
    comments: 15,
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop',
    hashtags: ['TechConf2024', 'Networking']
  },
  {
    id: '3',
    platform: 'linkedin',
    author: 'Dr. Emily Rodriguez',
    handle: 'emily-rodriguez-phd',
    content: 'Presenting our latest research findings at TechConf 2024. The response from the community has been overwhelmingly positive. Grateful for the opportunity to share our work on sustainable technology solutions.',
    timestamp: '6 hours ago',
    likes: 156,
    comments: 23,
    shares: 34,
    hashtags: ['TechConf2024', 'Research', 'Sustainability']
  },
  {
    id: '4',
    platform: 'twitter',
    author: 'Alex Thompson',
    handle: '@alexthompsondev',
    content: 'Just finished the hands-on workshop on cloud architecture. Mind = blown 🤯 The practical examples were incredibly valuable. #TechConf2024 #CloudComputing',
    timestamp: '8 hours ago',
    likes: 67,
    comments: 12,
    shares: 18,
    hashtags: ['TechConf2024', 'CloudComputing', 'Workshop']
  }
];

export const SocialFeedSection = ({ 
  title = "Social Feed", 
  description = "See what people are saying about our event",
  hashtag = "#Event2024",
  platforms = ['twitter', 'instagram', 'linkedin'],
  style 
}: SocialFeedSectionProps) => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'twitter' | 'instagram' | 'linkedin'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate loading posts
    setPosts(mockPosts.filter(post => platforms.includes(post.platform)));
  }, [platforms.join(',')]); // Use string comparison instead of array reference

  const getPlatformIcon = (platform: string) => {
    const icons = {
      twitter: <Twitter className="w-5 h-5" />,
      instagram: <Instagram className="w-5 h-5" />,
      linkedin: <Linkedin className="w-5 h-5" />
    };
    return icons[platform as keyof typeof icons];
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      twitter: 'text-blue-500',
      instagram: 'text-pink-500',
      linkedin: 'text-blue-700'
    };
    return colors[platform as keyof typeof colors];
  };

  const filteredPosts = posts.filter(post => {
    const matchesFilter = activeFilter === 'all' || post.platform === activeFilter;
    const matchesSearch = searchTerm === '' || 
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesFilter && matchesSearch;
  });

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <section style={style} className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-muted-foreground mb-6">{description}</p>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex gap-2">
              <Button
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('all')}
              >
                All Posts
              </Button>
              {platforms.map(platform => (
                <Button
                  key={platform}
                  variant={activeFilter === platform ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveFilter(platform)}
                  className="flex items-center gap-2"
                >
                  <span className={getPlatformColor(platform)}>
                    {getPlatformIcon(platform)}
                  </span>
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </Button>
              ))}
            </div>
            
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </div>

        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No posts found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full bg-muted ${getPlatformColor(post.platform)}`}>
                        {getPlatformIcon(post.platform)}
                      </div>
                      <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm text-muted-foreground">@{post.handle}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <p className="text-foreground leading-relaxed">{post.content}</p>
                  
                  {post.image && (
                    <div className="rounded-lg overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.hashtags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{formatNumber(post.likes)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{formatNumber(post.comments)}</span>
                    </div>
                    {post.shares && (
                      <div className="flex items-center gap-1">
                        <Repeat2 className="w-4 h-4" />
                        <span>{formatNumber(post.shares)}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline">
            Load More Posts
          </Button>
        </div>
      </div>
    </section>
  );
};