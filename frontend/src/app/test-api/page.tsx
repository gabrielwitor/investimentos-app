'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

export default function TestApiPage() {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const testApi = async () => {
      try {
        console.log('Testing API call...')
        const response = await api.get('/api/ativos')
        console.log('API response:', response.data)
        setData(response.data)
      } catch (err: any) {
        console.error('API error:', err)
        setError(err.message || 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testApi()
  }, [])

  if (loading) return <div className="text-gray-900">Loading...</div>
  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">API Test</h1>
      <pre className="bg-gray-100 text-gray-900 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  )
}
