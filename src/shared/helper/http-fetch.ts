import { NotFoundException } from '@nestjs/common'

interface BaseRequest {
  body?: BodyInit | null
  headers?: HeadersInit
}

export async function fetchPlatform(
  url: string,
  method: string,
  request: BaseRequest = {},
): Promise<unknown> {
  let response: Response

  try {
    response = await fetch(url, {
      method,
      headers: request.headers,
      ...(method !== 'GET' &&
        request.body && { body: JSON.stringify(request.body) }),
    })
  } catch (error) {
    throw new NotFoundException()
  }

  if (!response.ok) {
    throw new NotFoundException()
  }

  return response.json()
}
