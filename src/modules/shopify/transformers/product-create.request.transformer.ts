import { Expose } from 'class-transformer'

export class ProductCreateRequestTransformer {
  @Expose()
  title: string

  @Expose({ name: 'body_html' })
  description: string

  @Expose({ name: 'product_type' })
  type: string

  @Expose()
  vendor: string
}
