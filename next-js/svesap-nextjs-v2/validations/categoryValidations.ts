import { z } from 'zod';

// File {
//   size: 129396,
//   type: 'image/jpeg',
//   name: 'Safi-Laravel-Logo (1).jpg',
//   lastModified: 1745654160795
// }
const image = z.object({
  size: z.number().max(1024000, 'Image <= 1MB'), // 1MB
  type: z.string(),
  name: z.string(),
  lastModified: z.number(),
});

export const createCategoryValidation = z.object({
  name: z.string().min(3).trim(),
  description: z.string().min(3).trim(),
  image: image,
});

export const deleteCategoryValidation = z.object({
  id: z.string(),
});
