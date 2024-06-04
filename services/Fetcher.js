import supabase from 'utils/supabase/client'

const API_ROOT = process.env.NEXT_PUBLIC_BASE_URL + '/api'
const TIMEOUT = 10000

const Fetcher = (() => {
  const create = async (endpoint, options = {}) => {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const headers = {
        ...(options.headers ?? {}),
        ...(session && { Authorization: `Bearer ${session.access_token}` }),
      }

      const response = await fetch(API_ROOT + endpoint, {
        ...options,
        headers,
        signal: controller.signal,
      })

      clearTimeout(timer)

      const data = await response.json()

      if (response.ok) {
        return data
      }

      return Promise.reject({ ...data, status: response.status })
    } catch (error) {
      clearTimeout(timer)
      throw error
    } finally {
      controller.abort()
    }
  }

  return {
    get: async (url, options = {}) => {
      const result = await create(url, {
        method: 'GET',
        ...options,
      })
      return result
    },
    post: async (url, body) => {
      const result = await create(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      return result
    },
    put: async (url, body) => {
      const result = await create(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      return result
    },
    patch: async (url, body) => {
      const result = await create(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      return result
    },
    delete: async (url) => {
      const result = await create(url, {
        method: 'DELETE',
      })
      return result
    },
  }
})()

export default Fetcher
