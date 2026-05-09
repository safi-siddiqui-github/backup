export const pathConstants = {
  login: '/',
  dashboard: '/dashboard',
  categories: {
    create: '/categories/create',
    read: '/categories',
    recover: '/categories/recover',
    update: '/categories/:id/update',
  },

  api: {
    post: {
      login: '/login',
      logout: '/logout',
      categoryCreate: '/category/create',
      categoryDelete: '/category/delete',
      categoryRecover: '/category/recover',
    },
    get: {
      categoryAll: '/category/list',
      categoryTrashed: '/category/trashed',
    }
  },
};
