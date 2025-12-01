import axios from 'axios'

export const browserClient = axios.create({
  //   You can add your own configurations here
})

export const browserFetcher = async (...args: Parameters<typeof axios>) => {
  const res = await browserClient.get(...args)
  return res.data
}
