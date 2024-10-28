
import { ROOT_URL } from "../constants";
import { isServerSide } from "../utils";

import { parseServerCookie } from './utils/parseServerCookie'

class MockController {
  abort() {}
}

const request = async <T>({
  method = 'GET',
  url = '',
  headers = {},
  data,
  params,
  timeout = 5000,
  isSignalRequired = true,
  ...options
}: {
  url: string
  data?: Record<string, unknown> | Array<unknown>
  params?: Record<string, unknown>
  timeout?: number
  isSignalRequired?: boolean
} & RequestInit): Promise<T> => {
  const controller = isServerSide() ? new AbortController() : (new MockController() as AbortController)
  const body = ['GET', 'HEAD'].includes(method) ? undefined : JSON.stringify(data)
  const requestHeaders: Record<string, any> = { 'Content-Type': 'application/json', ...headers }

  if (!isServerSide()) {
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, timeout)
    timeoutId?.unref?.()
  } else {
    /**
     * server component에서 서버에 api 호출시 cookie 정보를 빼먹어서 명시적으로 넣어줌
     */
    const cookieString = await parseServerCookie()
    requestHeaders.Cookie = cookieString
  }

  const urlObject = new URL(ROOT_URL + url)

  if (params) {
    const searchParams = new URLSearchParams(params as Record<string, string>)
    urlObject.search = searchParams.toString()
  }

  const response = await fetch(urlObject.toString(), {
    method,
    body,
    headers: requestHeaders,
    ...(!isServerSide() && isSignalRequired ? { signal: controller.signal } : {}),

    /** ISA 때 이상하게 동작함 */
    cache: "no-cache",
    ...options,
  });

  if (!response.ok) throw new Error(`Failed to fetch ${response.url} ${response.status} ${response.statusText}`)

  const responseData = await response.json()
  return responseData
}

export default request
