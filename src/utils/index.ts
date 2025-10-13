import { BASE_URL } from "./request";

export const getServerSource = (url: string | null | undefined) => {
  if (!url) return '' 
  // 判断是否是 Base64
  if (url.startsWith('data:image/')) {
    return url
  }
  // 否则拼接服务器地址
  return BASE_URL + url
}

