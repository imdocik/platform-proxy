import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ShopifyService } from './shopify.service'
import { SUPPORTED_PLATFORM } from '../../shared/enums'
import { ProductCreateRequestDto } from '../../shared/dto/product-create.request.dto'
import { OrderResponse } from '../../shared/contracts/order.response'
import { ProductResponse } from '../../shared/contracts/product.response'

@Controller(SUPPORTED_PLATFORM.SHOPIFY)
export class ShopifyController {
  constructor(private readonly service: ShopifyService) {}

  @Get('/orders')
  async getOrders(): Promise<OrderResponse[]> {
    return this.service.getOrders()
  }

  @Get('/order/:id')
  async getOrderById(@Param('id') id: string): Promise<OrderResponse> {
    return this.service.getOrder(id)
  }

  @Post('/product')
  async createProduct(
    @Body() body: ProductCreateRequestDto,
  ): Promise<ProductResponse> {
    return this.service.createProduct(body)
  }
}
