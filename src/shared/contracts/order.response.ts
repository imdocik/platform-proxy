import { CURRENCY, WEIGHT_UNIT } from '../enums'

export interface PriceResponse {
  amount: number
  currency: CURRENCY
}

export interface PriceSet {
  shopPrice: PriceResponse
  presentmentPrice: PriceResponse
}

export interface OrderItemResponse {
  id: string
  name: string
  weight: string
  weightUnit: WEIGHT_UNIT
  priceDetails: PriceSet
  productId: string
  quantity: number
  sku: string
  variantId: string
  tax: PriceSet
}

export interface OrderResponse {
  id: string
  name: string
  priceDetails: PriceSet
  items: OrderItemResponse[]
}
