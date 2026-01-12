import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

const createApiClient = () => {
  const { webApp } = await import('./context/TelegramContext')

  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 60000,
    headers: { 'Content-Type': 'application/json' }
  })

  client.interceptors.request.use((config) => {
    if (webApp && webApp.initData) {
      config.headers['X-Telegram-Init-Data'] = webApp.initData
    }
    return config
  })

  return client
}

export const api = {
  auth: {
    login: async () => (await createApiClient()).post('/auth/login'),
    getProfile: async () => (await createApiClient()).get('/auth/profile')
  },
  subscription: {
    getStatus: async () => (await createApiClient()).get('/subscription/status'),
    createCheckoutSession: async (priceId) => (await createApiClient()).post('/subscription/create-checkout', { priceId }),
    createPortalSession: async () => (await createApiClient()).post('/subscription/portal'),
    cancel: async () => (await createApiClient()).post('/subscription/cancel')
  },
  projects: {
    getAll: async () => (await createApiClient()).get('/projects'),
    getById: async (id) => (await createApiClient()).get(`/projects/${id}`),
    create: async (formData) => (await createApiClient()).post('/projects', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: async (id) => (await createApiClient()).delete(`/projects/${id}`)
  },
  ai: {
    generateRender: async (projectId, style) => (await createApiClient()).post(`/ai/generate-render/${projectId}`, { style }),
    regenerateRender: async (projectId, style) => (await createApiClient()).post(`/ai/generate-render/${projectId}/regenerate`, { style }),
    generateText: async (projectId, options) => (await createApiClient()).post(`/ai/generate-text/${projectId}`, options),
    regenerateText: async (projectId, options) => (await createApiClient()).post(`/ai/generate-text/${projectId}/regenerate`, options)
  },
  channels: {
    getAll: async () => (await createApiClient()).get('/channels'),
    connect: async (channelId) => (await createApiClient()).post('/channels/connect', { channelId }),
    disconnect: async (channelId) => (await createApiClient()).delete(`/channels/${channelId}`),
    post: async (channelId, projectId, options) => (await createApiClient()).post('/channels/post', { channelId, projectId, ...options })
  }
}

export default api
