<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from './lib/axios'
import { debounce } from 'lodash-es'

import { Input } from './components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table'

const message = ref('')
const products = ref<{ id: string; name: string; price: string }[]>([])
const loading = ref(false)
const name = ref('')
const minPrice = ref('')
const maxPrice = ref('')

const appName = import.meta.env.VITE_APP_NAME || 'App'
const logo = import.meta.env.VITE_APP_LOGO_URL

const fetchMessage = async () => {
  try {
    const res = await api.get('/welcome')
    message.value = res.data
  } catch (err) {
    console.error('Error fetching welcome message:', err)
  }
}

const fetchProducts = async (filters = {}) => {
  loading.value = true
  try {
    const res = await api.post('/products/get-all', filters)
    products.value = res.data || []
  } catch (err) {
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchMessage()
  fetchProducts()
})

const debouncedFetch = debounce(() => {
  fetchProducts({
    name: name.value,
    minPrice: minPrice.value || undefined,
    maxPrice: maxPrice.value || undefined,
  })
}, 500)

watch([name, minPrice, maxPrice], debouncedFetch)
</script>

<template>
  <div class="flex items-center justify-center h-screen w-screen bg-gray-100 p-4 overflow-hidden">
    <div class="w-full h-full max-w-6xl max-h-[95vh] shadow-xl bg-white rounded-xl overflow-hidden flex flex-col">
      <!-- Header -->
      <div class="p-6 flex flex-col items-center">
        <img :src="logo" alt="Logo" width="120" height="auto" loading="lazy" />
        <h1 class="text-[20px] font-bold text-gray-800 mb-2">Welcome to {{ appName }}!</h1>
        <p class="text-gray-600 text-center">{{ message }}</p>
      </div>

      <!-- Filters -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-6 pb-4">
        <Input
          type="text"
          placeholder="Search Name"
          v-model="name"
        />
        <Input
          type="number"
          placeholder="Min Price"
          v-model="minPrice"
        />
        <Input
          type="number"
          placeholder="Max Price"
          v-model="maxPrice"
        />
      </div>

      <!-- Table Section -->
       <div class="px-6">
        <div class="overflow-auto rounded border border-gray-200 flex-grow mx-6 mb-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SL</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-if="loading">
                <TableCell colspan="3" class="text-center py-6">
                  <span class="spinner"></span> Loading products...
                </TableCell>
              </TableRow>
              <TableRow v-else-if="products.length === 0">
                <TableCell colspan="3" class="text-center py-6 text-gray-500">
                  No product found
                </TableCell>
              </TableRow>
              <TableRow
                v-else
                v-for="(product, index) in products"
                :key="product.id + '-' + index"
              >
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>{{ product.name }}</TableCell>
                <TableCell>${{ parseFloat(product.price).toFixed(2) }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
       </div>
    </div>
  </div>
</template>

<style scoped>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4a90e2;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
  margin-right: 8px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
