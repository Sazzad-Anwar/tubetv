import axios from 'axios'

export const videoId = (url: string) => url.split('/live/')[1]?.split('?si')[0]
export const thumbUrl = (url: string) =>
  `https://img.youtube.com/vi/${videoId(url)}/sddefault.jpg`

export function generateUniqueId(length: number = 8): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let uniqueId = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    uniqueId += chars[randomIndex]
  }

  return uniqueId
}

export const fetcher = async (url: string) => {
  const { data } = await axios.get(url)
  return data
}
export const gistId = 'ca985a695061575647b80ce97a5e8042'
export const apiUrl = 'https://www.youtube.com/youtubei/v1/search'
