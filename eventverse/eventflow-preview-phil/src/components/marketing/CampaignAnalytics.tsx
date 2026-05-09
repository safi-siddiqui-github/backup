import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CampaignAnalytics as CampaignAnalyticsType } from "@/types/marketing";
import { 
  TrendingUp, TrendingDown, Users, MousePointer, 
  ShoppingBag, DollarSign, Mail, BarChart3 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CampaignAnalyticsProps {
  analytics: CampaignAnalyticsType;
  className?: string;
}

export const CampaignAnalytics = ({ analytics, className }: CampaignAnalyticsProps) => {
  const metrics = [
    {
      label: "Total Reach",
      value: analytics.reach.toLocaleString(),
      icon: Users,
      color: "text-blue-500"
    },
    {
      label: "Delivered",
      value: analytics.delivered.toLocaleString(),
      icon: Mail,
      color: "text-green-500",
      subtitle: `${((analytics.delivered / analytics.sent) * 100).toFixed(1)}% delivery rate`
    },
    {
      label: "Opened",
      value: analytics.opened.toLocaleString(),
      icon: MousePointer,
      color: "text-purple-500",
      subtitle: `${analytics.engagementRate.toFixed(1)}% engagement`
    },
    {
      label: "Conversions",
      value: analytics.converted.toLocaleString(),
      icon: ShoppingBag,
      color: "text-success",
      subtitle: `${analytics.conversionRate.toFixed(1)}% conversion`
    },
  ];

  const hasPositiveROI = analytics.roi && analytics.roi > 0;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.label} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className={cn("p-2 rounded-lg bg-muted/50", metric.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-xs text-muted-foreground">{metric.label}</div>
                  {metric.subtitle && (
                    <div className="text-xs font-medium text-primary">{metric.subtitle}</div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ROI and Cost */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Total Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${analytics.totalCost.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground mt-2">
              Across {Object.keys(analytics.costPerChannel).length} channels
            </div>
          </CardContent>
        </Card>

        {analytics.roi !== undefined && (
          <Card className={cn(
            "hover:shadow-md transition-shadow",
            hasPositiveROI ? "bg-success/5 border-success/20" : "bg-destructive/5 border-destructive/20"
          )}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Return on Investment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className={cn(
                  "text-3xl font-bold",
                  hasPositiveROI ? "text-success" : "text-destructive"
                )}>
                  {analytics.roi > 0 ? '+' : ''}{analytics.roi.toFixed(1)}%
                </div>
                {hasPositiveROI ? (
                  <TrendingUp className="w-6 h-6 text-success" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-destructive" />
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {hasPositiveROI ? 'Positive returns' : 'Investment needed'}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Detailed Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sent</span>
              <span className="font-semibold">{analytics.sent.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Delivered</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{analytics.delivered.toLocaleString()}</span>
                <Badge variant="secondary" className="text-xs">
                  {((analytics.delivered / analytics.sent) * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Clicked</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">{analytics.clicked.toLocaleString()}</span>
                <Badge variant="secondary" className="text-xs">
                  {((analytics.clicked / analytics.delivered) * 100).toFixed(1)}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bounced</span>
              <span className="font-semibold text-destructive">{analytics.bounced.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Unsubscribed</span>
              <span className="font-semibold text-destructive">{analytics.unsubscribed.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
