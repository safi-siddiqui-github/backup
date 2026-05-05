export function getStatusColor(status: string): string {
  switch (status) {
    case "on track":
      return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
    case "at risk":
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    case "delayed":
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
    default:
      return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400";
  }
}

