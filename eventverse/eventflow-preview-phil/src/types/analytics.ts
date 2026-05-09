// Analytics and reporting types
export interface AnalyticsData {
  eventId: string;
  metrics: EventMetrics;
  modulePerformance: ModulePerformanceData[];
  timeSeriesData: TimeSeriesData[];
  demographicData: DemographicData;
  engagementData: EngagementData;
}

export interface EventMetrics {
  totalAttendees: number;
  overallEngagement: number;
  moduleUtilization: number;
  eventEfficiency: number;
  predictedROI?: number;
  conversionRate?: number;
}

export interface ModulePerformanceData {
  moduleId: string;
  moduleName: string;
  score: number;
  revenue: number;
  engagement: number;
  efficiency: number;
  status: 'excellent' | 'good' | 'fair' | 'poor';
  insights: string;
  usage: number;
  color?: string;
}

export interface TimeSeriesData {
  timestamp: Date;
  metric: string;
  value: number;
  category?: string;
}

export interface DemographicData {
  ageGroups: AgeGroupData[];
  locations: LocationData[];
  interests: InterestData[];
  sources: SourceData[];
}

export interface AgeGroupData {
  range: string;
  count: number;
  percentage: number;
}

export interface LocationData {
  city: string;
  country: string;
  count: number;
  percentage: number;
}

export interface InterestData {
  category: string;
  count: number;
  engagement: number;
}

export interface SourceData {
  source: string;
  count: number;
  conversionRate: number;
}

export interface EngagementData {
  hourly: HourlyEngagement[];
  interactions: InteractionData[];
  content: ContentEngagement[];
}

export interface HourlyEngagement {
  hour: string;
  photos: number;
  surveys: number;
  games: number;
  checkins?: number;
}

export interface InteractionData {
  type: 'click' | 'view' | 'share' | 'comment' | 'like' | 'download';
  count: number;
  timestamp: Date;
  userId?: string;
}

export interface ContentEngagement {
  contentId: string;
  contentType: 'photo' | 'video' | 'post' | 'announcement';
  views: number;
  interactions: number;
  shares: number;
  engagementRate: number;
}

// Report types
export interface ReportConfig {
  id: string;
  name: string;
  type: ReportType;
  dateRange: DateRange;
  filters: ReportFilter[];
  metrics: string[];
  format: ReportFormat;
}

export type ReportType = 'attendance' | 'engagement' | 'revenue' | 'feedback' | 'module_performance' | 'custom';

export type ReportFormat = 'pdf' | 'excel' | 'csv' | 'json';

export interface DateRange {
  start: Date;
  end: Date;
}

export interface ReportFilter {
  field: string;
  operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'in' | 'not_in';
  value: string | number | Date | (string | number)[];
}

// Dashboard types
export interface DashboardWidget {
  id: string;
  type: WidgetType;
  title: string;
  config: WidgetConfig;
  position: WidgetPosition;
  size: WidgetSize;
}

export type WidgetType = 'metric' | 'chart' | 'table' | 'list' | 'gauge' | 'map' | 'calendar';

export interface WidgetConfig {
  dataSource: string;
  metrics?: string[];
  filters?: ReportFilter[];
  chartType?: ChartType;
  refreshInterval?: number;
}

export type ChartType = 'line' | 'bar' | 'pie' | 'area' | 'scatter' | 'heatmap';

export interface WidgetPosition {
  x: number;
  y: number;
}

export interface WidgetSize {
  width: number;
  height: number;
}