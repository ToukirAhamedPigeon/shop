'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { Card, CardContent } from '@/components/ui/card'

function App() {
  const [message, setMessage] = useState<string>('')
  const appName = process.env.VITE_APP_NAME || 'App'

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get('/welcome') // http://localhost:5000/api/welcome
        setMessage(res.data)
      } catch (err) {
        console.error('Error fetching welcome message:', err)
      }
    }

    fetchMessage()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 p-4">
      <Card className="max-w-md w-full text-center shadow-xl">
        <CardContent className="p-6 flex flex-col items-center">
          <img
            src={process.env.NEXT_PUBLIC_APP_LOGO_URL}
            alt="Logo"
            width={120}
            height="auto"
            loading="lazy"
          />
          <h1 className="text-[20px] font-bold text-gray-800 mb-2">Welcome to {appName}!</h1>
          <p className="text-gray-600">{message}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
