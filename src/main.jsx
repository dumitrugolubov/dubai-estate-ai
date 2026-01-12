import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { TelegramProvider } from './context/TelegramContext'
import { LanguageProvider } from './context/LanguageContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TelegramProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </TelegramProvider>
  </React.StrictMode>
)
