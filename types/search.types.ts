import type { Enums } from './database.types'

export enum SortBy {
  MANUAL = 'manual',
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  NAME_ASC = 'name_asc',
  NAME_DESC = 'name_desc',
  CREATED_AT_DESC = 'created_at_desc',
}

export interface CollectionSearchParams {
  start: number
  limit: number
  sortBy: SortBy
  productType: Enums<'productType'>[]
}
