import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTelegram } from '../context/TelegramContext'
import { useAppStore } from '../store/useAppStore'
import Button from '../components/Button'
import { Check, Sparkles, Image, FileText, Send, Building2, Clock } from 'lucide-react'

const features = [
  { icon: Image, title: '3D Рендеринг', description: 'Превращайте чертежи в фотореалистичные 3D визуализации' },
  { icon: FileText, title: 'AI Тексты', description: 'Генерируйте продающие описания на любом языке' },
  { icon: Send, title: 'Автопостинг', description: 'Публикуйте объекты в каналы одним кликом' },
  { icon: Clock, title: 'Экономия времени', description: 'Создавайте контент в 10 раз быстрее' }
]

const pricing = {
  monthly: 49.99,
  features: ['Безлимитные 3D рендеры', 'Генерация текстов', 'Автопостинг в каналы', 'Сохраняйте проекты', 'Приоритетная поддержка']
}

const Onboarding = () => {
  const navigate = useNavigate()
  const { user, openLink } = useTelegram()
  const { subscription } = useAppStore()
  const [isLoading, setLocalLoading] = useState(false)
  const isSubscribed = subscription.status === 'active'

  useEffect(() => { if (isSubscribed) navigate('/dashboard') }, [isSubscribed, navigate])

  const handleSubscribe = async () => {
    setLocalLoading(true)
    openLink('https://checkout.stripe.com/your-payment-link')
    setLocalLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="min-h-screen pb-8">
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2481cc] to-[#D4AF37] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div><h1 className="text-xl font-bold">DubaiEstate AI</h1><p className="text-sm opacity-60">Для риэлторов Дубая</p></div>
          </div>
          <div className="px-3 py-1 rounded-full bg-[var(--tg-theme-secondary-bg-color)] text-sm">Premium</div>
        </div>
        {user && <p className="text-sm opacity-70 mb-4">Привет, {user.first_name}! 👋</p>}
      </header>

      <section className="px-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-3 leading-tight">Превращайте планировки в<br /><span className="text-gradient">продающий контент</span></h2>
          <p className="text-lg opacity-70">AI-инструменты для быстрого создания 3D визуализаций и описаний</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden shadow-xl mb-6">
          <div className="aspect-[4/3] bg-gradient-to-br from-[#2481cc] to-[#1a5a8f] flex items-center justify-center p-6">
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <div className="w-full aspect-square bg-white/20 rounded-lg mb-2" />
                <p className="text-xs opacity-70">Чертеж</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 backdrop-blur">
                <div className="w-full aspect-square bg-white/90 rounded-lg mb-2" />
                <p className="text-xs opacity-70">3D Визуализация</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur rounded-full text-sm">
            <Sparkles className="w-4 h-4" />AI Powered
          </div>
        </motion.div>
      </section>

      <section className="px-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Возможности</h3>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + index * 0.1 }}
              className="p-4 rounded-xl bg-[var(--tg-theme-secondary-bg-color)]">
              <div className="w-10 h-10 rounded-lg bg-[var(--tg-theme-button-color)] flex items-center justify-center mb-3" style={{ color: 'var(--tg-theme-button-text-color)' }}>
                <feature.icon size={20} />
              </div>
              <h4 className="font-medium mb-1">{feature.title}</h4>
              <p className="text-sm opacity-60">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="px-6 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #2481cc 0%, #D4AF37 100%)' }}>
          <div className="p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div><p className="text-sm opacity-80">Подписка</p><p className="text-3xl font-bold">${pricing.monthly}<span className="text-lg font-normal opacity-80">/мес</span></p></div>
              <div className="px-3 py-1 bg-white/20 rounded-full text-sm">Лучший выбор</div>
            </div>
            <ul className="space-y-2 mb-6">{pricing.features.map((feature) => (<li key={feature} className="flex items-center gap-2 text-sm"><Check size={16} />{feature}</li>))}</ul>
            <Button fullWidth variant="secondary" size="large" loading={isLoading} onClick={handleSubscribe} style={{ background: 'white', color: '#2481cc' }}>
              Оформить подписку
            </Button>
            <p className="text-center text-xs opacity-70 mt-3">Оплата через Stripe. Отмена в любой момент.</p>
          </div>
        </motion.div>
      </section>

      <footer className="px-6 text-center">
        <p className="text-sm opacity-50">Уже есть аккаунт? <button onClick={() => navigate('/dashboard')} className="underline" style={{ color: 'var(--tg-theme-button-color)' }}>Войти</button></p>
      </footer>
    </motion.div>
  )
}

export default Onboarding
