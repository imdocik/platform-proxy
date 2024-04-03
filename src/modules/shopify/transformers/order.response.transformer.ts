import { CURRENCY, WEIGHT_UNIT } from '../../../shared/enums'
import { Expose, Transform, Type } from 'class-transformer'

export class PriceResponseTransformer {
  @Type(() => Number)
  @Expose()
  amount: number

  @Transform(({ value }) => value as CURRENCY)
  @Expose({ name: 'currency' })
  currency_code: CURRENCY
}

export class PriceSetResponseTransformer {
  @Type(() => PriceResponseTransformer)
  @Expose({ name: 'shopPrice' })
  shop_money: PriceResponseTransformer

  @Type(() => PriceResponseTransformer)
  @Expose({ name: 'presentmentPrice' })
  presentment_money: PriceResponseTransformer
}

export class OrderItemResponseTransformer {
  @Type(() => String)
  @Expose()
  id: number

  @Expose()
  name: string

  @Type(() => String)
  @Transform(
    ({ value }) => {
      return value ? (value / 1000).toFixed(2) : '0'
    },
    {
      toPlainOnly: true,
    },
  )
  @Expose({ name: 'weight' })
  grams: number

  @Expose()
  weightUnit: WEIGHT_UNIT = WEIGHT_UNIT.KG

  @Type(() => PriceSetResponseTransformer)
  @Expose({ name: 'priceDetails' })
  price_set: PriceSetResponseTransformer

  @Type(() => String)
  @Expose({ name: 'productId' })
  product_id: number

  @Expose()
  quantity: number

  @Expose()
  sku: string

  @Type(() => String)
  @Expose({ name: 'variantId' })
  variant_id: number

  @Type(() => PriceSetResponseTransformer)
  @Transform(
    ({ value }) => {
      return Array.isArray(value) && value.length ? value[0].price_set : ''
    },
    {
      toPlainOnly: true,
    },
  )
  @Expose({ name: 'tax' })
  tax_lines: PriceSetResponseTransformer
}

export class OrderResponseTransformer {
  @Expose()
  @Type(() => String)
  id: string

  @Expose()
  name: string

  @Type(() => PriceSetResponseTransformer)
  @Expose({ name: 'priceDetails' })
  total_price_set: PriceSetResponseTransformer

  @Type(() => OrderItemResponseTransformer)
  @Transform(
    ({ value }) => {
      const itemsSpreaded = []

      value.forEach((item) => {
        if (item.quantity === 1) {
          itemsSpreaded.push(item)
        } else {
          itemsSpreaded.push(
            ...Array.from({ length: item.quantity }, () => ({
              ...item,
              quantity: 1,
            })),
          )
        }
      })

      return itemsSpreaded
    },
    {
      toPlainOnly: true,
    },
  )
  @Expose({ name: 'items' })
  line_items: OrderItemResponseTransformer[]
}
