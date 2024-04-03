export const mockShopifyOrder = {
  order: {
    id: 450789469,
    name: '#1001',
    total_price: '598.94',
    total_price_set: {
      shop_money: {
        amount: '598.94',
        currency_code: 'USD',
      },
      presentment_money: {
        amount: '598.94',
        currency_code: 'USD',
      },
    },
    line_items: [
      {
        id: 466157049,
        grams: 200,
        name: 'IPod Nano - 8gb - green',
        price: '199.00',
        price_set: {
          shop_money: {
            amount: '199.00',
            currency_code: 'USD',
          },
          presentment_money: {
            amount: '199.00',
            currency_code: 'USD',
          },
        },
        product_id: 632910392,
        quantity: 1,
        sku: 'IPOD2008GREEN',
        variant_id: 39072856,
        vendor: null,
        tax_lines: [
          {
            channel_liable: null,
            price: '3.98',
            price_set: {
              shop_money: {
                amount: '3.98',
                currency_code: 'USD',
              },
              presentment_money: {
                amount: '3.98',
                currency_code: 'USD',
              },
            },
            rate: 0.06,
            title: 'State Tax',
          },
        ],
      },
    ],
  },
}

export const mockExpectedTransformedOrder = {
  id: '450789469',
  name: '#1001',
  priceDetails: {
    shopPrice: { amount: 598.94, currency: 'USD' },
    presentmentPrice: { amount: 598.94, currency: 'USD' },
  },
  items: [
    {
      id: '466157049',
      name: 'IPod Nano - 8gb - green',
      weight: '0.20',
      weightUnit: 'KG',
      priceDetails: {
        shopPrice: { amount: 199, currency: 'USD' },
        presentmentPrice: { amount: 199, currency: 'USD' },
      },
      productId: '632910392',
      quantity: 1,
      sku: 'IPOD2008GREEN',
      variantId: '39072856',
      tax: {
        shopPrice: { amount: 3.98, currency: 'USD' },
        presentmentPrice: { amount: 3.98, currency: 'USD' },
      },
    },
  ],
}
