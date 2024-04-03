import { IsNotEmpty, IsString, MaxLength } from 'class-validator'
import { ProductCreateRequest } from '../contracts/product-create.request'

export class ProductCreateRequestDto implements ProductCreateRequest {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  vendor: string

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  type: string
}
