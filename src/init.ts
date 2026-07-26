import { setup, Client } from "./lib/allauth"

export function init() {
  const apiUrl = import.meta.env.VITE_API_URL

  setup(
    Client.BROWSER,
    `${apiUrl}/_allauth/${Client.BROWSER}/v1`,
    true // withCredentials
  )
}
