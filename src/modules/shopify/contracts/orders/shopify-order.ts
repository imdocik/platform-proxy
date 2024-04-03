export interface ShopifyPrice {
  amount: string
  currency_code: string
}

export interface ShopifyPriceSet {
  shop_money: ShopifyPrice
  presentment_money: ShopifyPrice
}

export interface ShopifyLineItemsTaxLines {
  price_set: ShopifyPriceSet
}

export interface ShopifyOrderLineItems {
  id: number
  name: string
  grams: number
  price_set: ShopifyPriceSet
  product_id: number
  quantity: number
  sku: string
  variant_id: number
  tax_lines: ShopifyLineItemsTaxLines[]
}

export interface ShopifyOrder {
  id: number
  name: string
  total_price_set: ShopifyPriceSet
  line_items: ShopifyOrderLineItems[]
}
