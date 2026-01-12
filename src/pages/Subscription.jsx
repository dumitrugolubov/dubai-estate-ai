import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTelegram } from '../context/TelegramContext'
import { useAppStore } from '../store/useAppStore'
import { useLanguage } from '../context/LanguageContext'
import Button from '../components/Button'
import { Check, CreditCard, Shield, Zap, Globe, Download } from 'lucide-react'

const features = [
  { icon: Zap, title: 'unlimitedRenders', desc: 'Создавайте сколько угодно 3D визуализаций' },
  { icon: Globe, title: 'textGeneration', desc: 'Генерируйте описания на любом языке' },
  { icon: Download, title: 'HD Quality', desc: 'Изображения в высоком разрешении' },
  { icon: Shield, title: 'Priority', desc: 'Быстрая обработка запросов' }
]

const plans = [
  {
    id: 'monthly', name: 'monthly', price: 49.99, period: '/мес', popular: true,
    features: ['unlimitedRenders', 'textGeneration', 'autoPosting', 'saveProjects', 'prioritySupport']
  },
  { id: 'yearly', name: 'yearly', price: 399.99, period: '/год', savings: '33%',
    features: ['unlimitedRenders', 'textGeneration', 'autoPosting', 'saveProjects', 'prioritySupport', 'save33']
  }
]

const Subscription = () => {
  const navigate = useNavigate()
  const { openLink, showAlert } = useTelegram()
  const { subscription } = useAppStore()
  const { t, language } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('monthly')

  const isSubscribed = subscription.status === 'active'

  const handleSubscribe = () => {
    setLoading(true)
    openLink('https://checkout.stripe.com/your-payment-link')
    setTimeout(() => setLoading(false), 2000)
  }

  const handleManage = () => {
    openLink('https://billing.stripe.com/your-customer-portal')
  }

  const getFeatureText = (key) => {
    const featuresMap = {
      unlimitedRenders: t('unlimitedRenders'),
      textGeneration: t('textGeneration'),
      autoPosting: t('autoPosting'),
      saveProjects: t('saveProjects'),
      prioritySupport: t('prioritySupport'),
      save33: language === 'ru' ? 'Экономия 33%' : 'Save 33%'
    }
    return featuresMap[key] || key
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-8">
      <header className="px-6 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="mb-6 text-sm opacity-60 hover:opacity-100">
          ← {t('continue')}
        </button>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{isSubscribed ? t('settings') : t('pricing')}</h1>
          <p className="text-sm opacity-60">{isSubscribed ? t('premiumActive') : t('perMonth')}</p>
        </div>
      </header>

      {isSubscribed && (
        <section className="px-6 mb-6">
          <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg, #2481cc 0%, #D4AF37 100%)' }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Check size={24} className="text-white" />
                </div>
                <div className="text-white">
                  <p className="font-semibold">Premium Active</p>
                  <p className="text-sm opacity-80">{t('premiumActive')}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" fullWidth onClick={handleManage} loading={loading} style={{ background: 'white', color: '#2481cc' }}>
                {t('management')}
              </Button>
            </div>
          </div>
        </section>
      )}

      {!isSubscribed && (
        <>
          <section className="px-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl bg-[var(--tg-theme-secondary-bg-color)]">
                  <div className="w-10 h-10 rounded-lg mb-3 flex items-center justify-center" style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}>
                    <feature.icon size={20} />
                  </div>
                  <h4 className="font-medium mb-1">{t(feature.title)}</h4>
                  <p className="text-sm opacity-60">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="px-6">
            <h2 className="text-lg font-semibold mb-4">{t('pricing')}</h2>
            <div className="space-y-4">
              {plans.map((plan, index) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-200 ${selectedPlan === plan.id ? 'ring-2 ring-[var(--tg-theme-button-color)]' : 'border-2 border-transparent'} bg-[var(--tg-theme-secondary-bg-color)]`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-medium bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]">
                      {t('bestChoice')}
                    </div>
                  )}
                  {plan.savings && (
                    <div className="absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-medium bg-green-500 text-white">
                      -{plan.savings}
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{t(plan.name)}</h3>
                      <p className="text-sm opacity-60">{t('perMonth')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">${plan.price}</p>
                      <p className="text-sm opacity-60">{plan.period}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check size={16} className="text-green-500 flex-shrink-0" />
                        {getFeatureText(feature)}
                      </li>
                    ))}
                  </ul>
                  <div className={`w-6 h-6 rounded-full border-2 absolute top-6 right-6 ${selectedPlan === plan.id ? 'border-[var(--tg-theme-button-color)] bg-[var(--tg-theme-button-color)]' : 'border-[var(--tg-theme-hint-color)]'}`}>
                    {selectedPlan === plan.id && <Check size={14} className="text-white mx-auto" />}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="px-6 mt-6">
            <Button fullWidth size="large" loading={loading} onClick={handleSubscribe} leftIcon={<CreditCard size={20} />}>
              {t('subscribe')} ${plans.find(p => p.id === selectedPlan)?.price}{t('perMonth')}
            </Button>
            <p className="text-center text-xs opacity-60 mt-4">
              <Shield size={12} className="inline mr-1" />
              {t('cancelAnytime')}
            </p>
          </section>
        </>
      )}
    </motion.div>
  )
}

export default Subscription
