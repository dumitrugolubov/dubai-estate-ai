import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTelegram } from '../context/TelegramContext'
import { useAppStore } from '../store/useAppStore'
import { useLanguage } from '../context/LanguageContext'
import Button from '../components/Button'
import toast from 'react-hot-toast'
import { ArrowLeft, User, CreditCard, MessageSquare, HelpCircle, Globe, Copy, Check, Trash2, ChevronRight, Link as LinkIcon } from 'lucide-react'

const languages = [
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
]

const Settings = () => {
  const navigate = useNavigate()
  const { user, showAlert } = useTelegram()
  const { subscription, connectedChannels, removeChannel, setLanguage: setAppLanguage } = useAppStore()
  const { t, language, setLanguage } = useLanguage()
  const [copied, setCopied] = useState(false)

  const handleCopyBotUsername = () => {
    navigator.clipboard.writeText('@DubaiEstateAI_Bot')
    setCopied(true)
    toast.success(t('copied'))
    setTimeout(() => setCopied(false), 2000)
  }

  const handleAddChannel = () => {
    showAlert(
      language === 'ru'
        ? 'Чтобы подключить канал:\n\n1. Добавьте бота @DubaiEstateAI_Bot как администратора в ваш канал\n2. Перейдите в раздел "Каналы"\n3. Введите @username вашего канала'
        : 'To connect a channel:\n\n1. Add bot @DubaiEstateAI_Bot as admin to your channel\n2. Go to "Channels" section\n3. Enter your channel @username'
    )
  }

  const handleDisconnectChannel = (channelId, channelTitle) => {
    removeChannel(channelId)
    toast.success(language === 'ru' ? 'Канал отключен' : 'Channel disconnected')
  }

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode)
    setAppLanguage(langCode)
    toast.success(langCode === 'ru' ? 'Язык изменен' : 'Language changed')
  }

  const handleSubscriptionManage = () => {
    navigate('/subscription')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-8">
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">{t('settings')}</h1>
        </div>
      </header>

      <section className="px-6 mb-6">
        <div className="p-6 rounded-2xl bg-[var(--tg-theme-secondary-bg-color)]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2481cc] to-[#D4AF37] flex items-center justify-center">
              <span className="text-2xl font-bold text-white">
                {user?.first_name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {user?.first_name} {user?.last_name || ''}
              </h2>
              <p className="text-sm opacity-60">@{user?.username || 'username'}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 mb-6">
        <h3 className="text-sm font-medium opacity-60 mb-3">{t('profile')}</h3>
        <button onClick={handleSubscriptionManage}
          className="w-full flex items-center gap-4 p-4 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}>
            <CreditCard size={20} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">{subscription.status === 'active' ? 'Premium' : t('subscribe')}</p>
            <p className="text-sm opacity-60">
              {subscription.status === 'active' ? t('premiumActive') : t('perMonth')}
            </p>
          </div>
          <ChevronRight size={20} className="opacity-40" />
        </button>
      </section>

      <section className="px-6 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium opacity-60">{t('channels')}</h3>
          <button onClick={handleAddChannel} className="text-sm flex items-center gap-1" style={{ color: 'var(--tg-theme-button-color)' }}>
            <LinkIcon size={16} />{t('addChannel')}
          </button>
        </div>

        {connectedChannels.length === 0 ? (
          <div className="p-6 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] text-center">
            <LinkIcon size={32} className="mx-auto mb-3 opacity-40" />
            <p className="opacity-60 mb-4">{t('channelConnected')}</p>
            <Button variant="outline" onClick={handleAddChannel}>{t('howToConnect')}</Button>
          </div>
        ) : (
          <div className="space-y-2">
            {connectedChannels.map((channel) => (
              <div key={channel.id} className="flex items-center gap-3 p-4 rounded-xl bg-[var(--tg-theme-secondary-bg-color)]">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}>
                  <span className="font-medium">{channel.title?.charAt(0) || 'C'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{channel.title}</p>
                  <p className="text-sm opacity-60">{channel.subscribersCount} {t('subscribers')}</p>
                </div>
                <button onClick={() => handleDisconnectChannel(channel.id, channel.title)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 p-4 rounded-xl bg-[var(--tg-theme-secondary-bg-color)]">
          <p className="text-sm font-medium mb-2">{t('botUsername')}</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 rounded-lg bg-[var(--tg-theme-bg-color)] text-sm">
              @DubaiEstateAI_Bot
            </code>
            <button onClick={handleCopyBotUsername} className="p-2 rounded-lg bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]">
              {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
          <p className="text-xs opacity-60 mt-2">{t('addBotAdmin')}</p>
        </div>
      </section>

      <section className="px-6 mb-6">
        <h3 className="text-sm font-medium opacity-60 mb-3">{t('language')}</h3>
        <div className="grid grid-cols-2 gap-2">
          {languages.map((lang) => (
            <button key={lang.code} onClick={() => handleLanguageChange(lang.code)}
              className={`flex flex-col items-center gap-1 p-4 rounded-xl transition-all ${language === lang.code ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]' : 'bg-[var(--tg-theme-secondary-bg-color)] hover:opacity-80'}`}>
              <span className="text-2xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="px-6">
        <button onClick={() => openLink('https://t.me/DubaiEstateSupport')}
          className="w-full flex items-center gap-4 p-4 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <MessageSquare size={20} className="text-blue-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium">{t('telegramChat')}</p>
            <p className="text-sm opacity-60">{t('help')}</p>
          </div>
          <ChevronRight size={20} className="opacity-40" />
        </button>
      </section>

      <footer className="px-6 mt-8 text-center">
        <p className="text-xs opacity-40">DubaiEstate AI v1.0.0</p>
      </footer>
    </motion.div>
  )
}

export default Settings
