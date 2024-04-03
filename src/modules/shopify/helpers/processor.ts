import { fetchPlatform } from '../../../shared/helper/http-fetch'
import {
  SHOPIFY_API_KEY,
  SHOPIFY_API_VERSION,
  SHOPIFY_PASSWORD,
  SHOPIFY_STORE_URL,
} from '../../../config'

export async function proxyRequest(
  domain: string,
  method: string,
  body = null,
): Promise<unknown> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization:
      'Basic ' +
      Buffer.from(`${SHOPIFY_API_KEY}:${SHOPIFY_PASSWORD}`).toString('base64'),
  }

  return fetchPlatform(
    `https://${SHOPIFY_STORE_URL}/admin/api/${SHOPIFY_API_VERSION}/${domain}`,
    method,
    {
      headers,
      body,
    },
  )
}
