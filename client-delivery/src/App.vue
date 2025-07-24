<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from './lib/axios'
import { Card, CardContent } from './components/ui/card'

const message = ref('')
const appName = import.meta.env.VITE_APP_NAME || 'App'
const logo = import.meta.env.VITE_APP_LOGO_URL

onMounted(async () => {
  try {
    const res = await api.get('/welcome')
    message.value = res.data
  } catch (err) {
    console.error('Error fetching welcome message:', err)
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen min-w-screen  bg-gray-100">
    <Card class="max-w-md w-full text-center shadow-xl">
      <CardContent class="p-6 flex flex-col items-center">
        <img
          :src="logo"
          alt="Logo"
          width="120"
          height="auto"
          loading="lazy"
        />
        <h1 class="text-[20px] font-bold text-gray-800 mb-2">Welcome to {{ appName }}!</h1>
        <p class="text-gray-600">{{ message }}</p>
      </CardContent>
    </Card>
  </div>
</template>
