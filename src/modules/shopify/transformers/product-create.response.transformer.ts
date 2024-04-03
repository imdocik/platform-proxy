import { Expose, Transform, Type } from 'class-transformer'

export class ProductCreateResponseTransformer {
  @Expose()
  @Type(() => String)
  id: string

  @Expose({ name: 'type' })
  product_type: string

  @Expose()
  title: string

  @Expose()
  status: string

  @Expose({ name: 'createdAt' })
  created_at: string

  @Expose({ name: 'updatedAt' })
  updated_at: string

  @Expose()
  vendor: string

  @Expose()
  @Transform(({ value }) => value.split(', '), {
    toPlainOnly: true,
  })
  tags: string[]
}
