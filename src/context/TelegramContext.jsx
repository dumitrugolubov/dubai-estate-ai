import { createContext, useContext, useEffect, useState } from 'react'

const TelegramContext = createContext(null)

export const useTelegram = () => {
  const context = useContext(TelegramContext)
  if (!context) {
    throw new Error('useTelegram must be used within TelegramProvider')
  }
  return context
}

export const TelegramProvider = ({ children }) => {
  const [webApp, setWebApp] = useState(null)
  const [user, setUser] = useState(null)
  const [themeParams, setThemeParams] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initApp = async () => {
      if (window.Telegram && window.Telegram.WebApp) {
        const tg = window.Telegram.WebApp
        tg.ready()
        tg.expand()

        setWebApp(tg)
        setUser(tg.initDataUnsafe?.user || null)
        setThemeParams(tg.themeParams || null)
        setIsReady(true)

        const root = document.documentElement
        const bgColor = tg.themeParams?.bg_color || '#ffffff'
        const textColor = tg.themeParams?.text_color || '#000000'
        const buttonColor = tg.themeParams?.button_color || '#2481cc'
        const buttonTextColor = tg.themeParams?.button_text_color || '#ffffff'

        root.style.setProperty('--tg-theme-bg-color', bgColor)
        root.style.setProperty('--tg-theme-text-color', textColor)
        root.style.setProperty('--tg-theme-button-color', buttonColor)
        root.style.setProperty('--tg-theme-button-text-color', buttonTextColor)
        document.body.style.backgroundColor = bgColor
        document.body.style.color = textColor
      }
    }

    initApp()
  }, [])

  const showAlert = (message) => {
    if (webApp) {
      webApp.showAlert(message)
    } else {
      alert(message)
    }
  }

  const showConfirm = (message, callback) => {
    if (webApp) {
      webApp.showConfirm(message, callback)
    } else {
      callback(confirm(message))
    }
  }

  const openLink = (url) => {
    if (webApp) {
      webApp.openLink(url)
    } else {
      window.open(url, '_blank')
    }
  }

  const close = () => {
    if (webApp) {
      webApp.close()
    }
  }

  const value = {
    webApp,
    user,
    themeParams,
    isReady,
    showAlert,
    showConfirm,
    openLink,
    close,
    platform: webApp?.platform || 'unknown',
    version: webApp?.version || 'unknown'
  }

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  )
}
