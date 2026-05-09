import { Badge } from "@/components/ui/badge";
import { UserPlus, RefreshCw, UserMinus, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { IntegrationSyncLog } from "@/data/mockIntegrationSyncLogs";
import { getIntegrationIcon, getIntegrationName, getIntegrationBgColor, formatDuration } from "@/lib/organizationUtils";

interface SyncLogItemProps {
  log: IntegrationSyncLog;
}

const SyncLogItem = ({ log }: SyncLogItemProps) => {
  const IntegrationIcon = getIntegrationIcon(log.integrationType);
  
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors bg-card">
      {/* Integration icon */}
      <div className={`p-3 rounded-full ${getIntegrationBgColor(log.integrationType)}`}>
        <IntegrationIcon className="w-5 h-5" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-semibold text-foreground">
            {getIntegrationName(log.integrationType)} Sync
          </h4>
          <Badge variant={log.status === 'success' ? 'default' : log.status === 'partial' ? 'secondary' : 'destructive'}>
            {log.status}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">
          {format(log.startedAt, 'PPp')}
          {log.completedAt && ` • Duration: ${formatDuration(log.duration)}`}
        </p>
        
        {/* Sync statistics */}
        <div className="grid grid-cols-3 gap-4 mt-3">
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">
              <UserPlus className="w-3 h-3 mr-1" />
              {log.usersAdded} added
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-700 dark:text-blue-400">
              <RefreshCw className="w-3 h-3 mr-1" />
              {log.usersUpdated} updated
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="outline" className="bg-red-500/10 text-red-700 dark:text-red-400">
              <UserMinus className="w-3 h-3 mr-1" />
              {log.usersRemoved} removed
            </Badge>
          </div>
        </div>
        
        {/* Error indicator */}
        {log.errors.length > 0 && (
          <div className="mt-2 p-2 bg-red-500/10 rounded text-sm text-red-700 dark:text-red-400">
            <AlertCircle className="w-4 h-4 inline mr-1" />
            {log.errors.length} error{log.errors.length > 1 ? 's' : ''} occurred during sync
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncLogItem;
