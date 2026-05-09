import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { authorType } from './authorType'
import { productType } from './productType'
import { saleType } from './saleType'
import { orderType } from './orderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    authorType,
    categoryType,
    productType,
    orderType,
    saleType,
  ],
}
