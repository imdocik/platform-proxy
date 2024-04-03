import { Test, TestingModule } from '@nestjs/testing'
import { ShopifyService } from './shopify.service'
import { proxyRequest } from './helpers/processor'
import {
  mockExpectedTransformedOrder,
  mockShopifyOrder,
} from './__mock__/order'

jest.mock('./helpers/processor')

describe('ShopifyService', () => {
  let service: ShopifyService
  ;(proxyRequest as jest.MockedFunction<any>).mockResolvedValueOnce(
    mockShopifyOrder,
  )

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopifyService],
    }).compile()

    service = module.get<ShopifyService>(ShopifyService)
  })

  it('should fetch order details by orderId', async () => {
    const result = await service.getOrder('orderId')

    expect(result).toEqual(mockExpectedTransformedOrder)
  })
})
