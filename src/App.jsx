import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useTelegram } from './context/TelegramContext'
import { useAppStore } from './store/useAppStore'
import api from './services/api'
import { Toaster } from 'react-hot-toast'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import NewProject from './pages/NewProject'
import ProjectEditor from './pages/ProjectEditor'
import Subscription from './pages/Subscription'
import Settings from './pages/Settings'
import Loading from './components/Loading'

function App() {
  const { isReady, showAlert } = useTelegram()
  const { setUser, setSubscription, setProjects, setConnectedChannels, setLoading, language, setLanguage } = useAppStore()

  useEffect(() => {
    const initializeApp = async () => {
      if (!isReady) return

      try {
        setLoading(true)
        const authData = await api.auth.login()
        setUser(authData.user)
        setLanguage(authData.user.language || 'ru')

        const subscriptionData = await api.subscription.getStatus()
        setSubscription(subscriptionData)

        const projectsData = await api.projects.getAll()
        setProjects(projectsData.projects || [])

        const channelsData = await api.channels.getAll()
        setConnectedChannels(channelsData.channels || [])
      } catch (error) {
        console.log('App initialization - mock mode')
      } finally {
        setLoading(false)
      }
    }

    initializeApp()
  }, [isReady])

  if (!isReady) {
    return <Loading message="Инициализация..." />
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{
        backgroundColor: 'var(--tg-theme-bg-color)',
        color: 'var(--tg-theme-text-color)'
      }}>
        <Toaster position="top-center" toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--tg-theme-secondary-bg-color)',
            color: 'var(--tg-theme-text-color)',
            borderRadius: '12px'
          }
        }} />
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/project/:id" element={<ProjectEditor />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
