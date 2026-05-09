
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Camera, Image, Share2, Download, Eye, Heart } from "lucide-react";

interface MediaAnalyticsProps {
  eventId: string;
}

const MediaAnalytics = ({ eventId }: MediaAnalyticsProps) => {
  const mediaOverview = {
    totalPhotos: 1247,
    totalVideos: 89,
    totalAlbums: 12,
    totalViews: 3456,
    totalDownloads: 567,
    totalShares: 234
  };

  const uploadTrend = [
    { hour: "14:00", photos: 45, videos: 3 },
    { hour: "15:00", photos: 89, videos: 8 },
    { hour: "16:00", photos: 134, videos: 12 },
    { hour: "17:00", photos: 187, videos: 15 },
    { hour: "18:00", photos: 223, videos: 18 },
    { hour: "19:00", photos: 267, videos: 22 },
    { hour: "20:00", photos: 298, videos: 25 },
    { hour: "21:00", photos: 324, videos: 28 }
  ];

  const topAlbums = [
    { name: "Ceremony", photos: 234, views: 890, downloads: 156 },
    { name: "Reception", photos: 189, views: 567, downloads: 98 },
    { name: "Dancing", photos: 156, views: 445, downloads: 87 },
    { name: "Group Photos", photos: 134, views: 234, downloads: 67 },
    { name: "Candid Moments", photos: 98, views: 189, downloads: 45 }
  ];

  const chartConfig = {
    photos: { label: "Photos", color: "#3B82F6" },
    videos: { label: "Videos", color: "#10B981" }
  };

  return (
    <div className="space-y-6">
      {/* Media Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Camera className="w-6 h-6 text-blue-600" />
              <div>
                <div className="text-xl font-bold">{mediaOverview.totalPhotos}</div>
                <div className="text-xs text-gray-600">Total Photos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Image className="w-6 h-6 text-green-600" />
              <div>
                <div className="text-xl font-bold">{mediaOverview.totalVideos}</div>
                <div className="text-xs text-gray-600">Total Videos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-purple-600" />
              <div>
                <div className="text-xl font-bold">{mediaOverview.totalViews}</div>
                <div className="text-xs text-gray-600">Total Views</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-orange-600" />
              <div>
                <div className="text-xl font-bold">{mediaOverview.totalDownloads}</div>
                <div className="text-xs text-gray-600">Downloads</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Share2 className="w-6 h-6 text-red-600" />
              <div>
                <div className="text-xl font-bold">{mediaOverview.totalShares}</div>
                <div className="text-xs text-gray-600">Shares</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6 text-pink-600" />
              <div>
                <div className="text-xl font-bold">{mediaOverview.totalAlbums}</div>
                <div className="text-xs text-gray-600">Albums</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Upload Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={uploadTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="photos" stroke="var(--color-photos)" strokeWidth={2} />
                  <Line type="monotone" dataKey="videos" stroke="var(--color-videos)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Albums */}
        <Card>
          <CardHeader>
            <CardTitle>Album Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topAlbums}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="photos" fill="var(--color-photos)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Album Details */}
      <Card>
        <CardHeader>
          <CardTitle>Album Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topAlbums.map((album, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">{album.name}</div>
                  <div className="text-sm text-gray-600">{album.photos} photos</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="font-medium">{album.views}</div>
                    <div className="text-xs text-gray-600">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{album.downloads}</div>
                    <div className="text-xs text-gray-600">Downloads</div>
                  </div>
                  <Badge variant="outline">
                    {Math.round((album.downloads / album.views) * 100)}% download rate
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaAnalytics;
