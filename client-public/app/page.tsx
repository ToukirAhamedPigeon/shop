'use client'
import { useEffect, useState } from 'react'
import api from '@/lib/axios'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2 } from 'lucide-react'

interface Product {
  Id: string
  Name: string
  Price: string
}

function App() {
  const [message, setMessage] = useState<string>('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const appName = process.env.VITE_APP_NAME || 'App'

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await api.get('/welcome')
        setMessage(res.data)
      } catch (err) {
        console.error('Error fetching welcome message:', err)
      }
    }

    fetchMessage()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const res = await api.post('/products/get-all')
        setProducts(res.data || [])
      } catch (err) {
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen bg-gray-100 p-4">
      <Card className="w-full max-w-6xl shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-6">
            <img
              src={process.env.NEXT_PUBLIC_APP_LOGO_URL}
              alt="Logo"
              width={120}
              height="auto"
              loading="lazy"
            />
            <h1 className="text-[20px] font-bold text-gray-800 mb-2">Welcome to {appName}!</h1>
            <p className="text-gray-600">{message}</p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SL</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-6">
                      <Loader2 className="animate-spin inline-block mr-2" />
                      Loading products...
                    </TableCell>
                  </TableRow>
                ) : (
                  products.map((product, index) => (
                    <TableRow key={product.Id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{product.Name}</TableCell>
                      <TableCell>${parseFloat(product.Price).toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default App
