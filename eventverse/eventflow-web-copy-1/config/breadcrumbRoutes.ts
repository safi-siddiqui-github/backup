
export interface BreadcrumbRoute {
  path: string;
  label: string;
  dynamicLabel?: (params: Record<string, string>, data?: any) => string;
  parent?: string;
}

export const breadcrumbRoutes: Record<string, BreadcrumbRoute> = {
  '/': {
    path: '/',
    label: 'EventFlow'
  },
  '/events': {
    path: '/events',
    label: 'Browse Events',
    parent: '/'
  },
  '/events/:eventId': {
    path: '/events/:eventId',
    label: 'Event Details',
    dynamicLabel: (params, data) => data?.eventName || `Event ${params.eventId}`,
    parent: '/events'
  },
  '/host/:hostId': {
    path: '/host/:hostId',
    label: 'Host Profile',
    dynamicLabel: (params, data) => data?.hostName || `Host ${params.hostId}`,
    parent: '/events'
  },
  '/events/manage': {
    path: '/events/manage',
    label: 'My Events',
    parent: '/'
  },
  '/dashboard': {
    path: '/dashboard',
    label: 'Dashboard',
    parent: '/'
  },
  '/guest/:eventId': {
    path: '/guest/:eventId',
    label: 'Guest Portal',
    dynamicLabel: (params, data) => data?.eventName ? `${data.eventName} - Guest Portal` : `Event ${params.eventId} - Guest Portal`,
    parent: '/events'
  },
  '/vendor': {
    path: '/vendor',
    label: 'Vendor Portal',
    parent: '/'
  }
};
