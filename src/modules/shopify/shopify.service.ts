import { Injectable } from '@nestjs/common'
import { ShopifyOrderResponse } from './contracts/orders/shopify-order.response'
import { ShopifyOrdersResponse } from './contracts/orders/shopify-orders.response'
import { ProductCreateRequestDto } from '../../shared/dto/product-create.request.dto'
import { plainBodyMapper } from './helpers/mapper'
import { proxyRequest } from './helpers/processor'
import { OrderResponse } from '../../shared/contracts/order.response'
import { ProductResponse } from '../../shared/contracts/product.response'
import { ShopifyProductResponse } from './contracts/products/shopify-product.response'
import { OrderResponseTransformer } from './transformers/order.response.transformer'
import { ProductCreateRequestTransformer } from './transformers/product-create.request.transformer'
import { ShopifyProductCreate } from './contracts/products/shopify-product-create.request'
import { ProductCreateResponseTransformer } from './transformers/product-create.response.transformer'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class ShopifyService {
  async getOrders(): Promise<OrderResponse[]> {
    const ordersBody = (await proxyRequest(
      'orders.json?fields=id%2Cname%2Ctotal_price_set%2Cline_items',
      'GET',
    )) as ShopifyOrdersResponse

    return plainBodyMapper<OrderResponseTransformer, OrderResponse>(
      plainToInstance(OrderResponseTransformer, ordersBody.orders, {
        exposeDefaultValues: true,
      }),
    ) as OrderResponse[]
  }

  async getOrder(orderId: string): Promise<OrderResponse> {
    const orderBody = (await proxyRequest(
      `orders/${orderId}.json?fields=id%2Cname%2Ctotal_price_set%2Cline_items`,
      'GET',
    )) as ShopifyOrderResponse

    return plainBodyMapper<OrderResponseTransformer, OrderResponse>(
      plainToInstance(OrderResponseTransformer, orderBody.order, {
        exposeDefaultValues: true,
      }),
    ) as OrderResponse
  }

  async createProduct(
    productBody: ProductCreateRequestDto,
  ): Promise<ProductResponse> {
    const product = plainBodyMapper<
      ProductCreateRequestTransformer,
      ShopifyProductCreate
    >(
      plainToInstance(ProductCreateRequestTransformer, productBody, {
        exposeDefaultValues: true,
      }),
    ) as ShopifyProductCreate

    const productResponse = (await proxyRequest('products.json', 'POST', {
      product,
    })) as ShopifyProductResponse

    return plainBodyMapper<ProductCreateResponseTransformer, ProductResponse>(
      plainToInstance(
        ProductCreateResponseTransformer,
        productResponse.product,
        {
          exposeDefaultValues: true,
        },
      ),
    ) as ProductResponse
  }
}
