import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useQuery } from 'react-query'

export function useFetchQuery(key, service) {
  const { data, error, isLoading } = useQuery(key, async () => {
    try {
      const res = await fetch(service)
      const json = await res.json()
      
      return json
    } catch (err) {
      throw err
    }
  })

  return { data, error, isLoading }
}

export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}