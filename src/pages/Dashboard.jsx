import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTelegram } from '../context/TelegramContext'
import { useAppStore } from '../store/useAppStore'
import Button from '../components/Button'
import { ProjectCard } from '../components/Card'
import { Plus, Settings, Building2, TrendingUp, Users, ChevronRight } from 'lucide-react'

const stats = [
  { icon: Building2, label: 'Всего объектов', value: '0', color: '#2481cc' },
  { icon: TrendingUp, label: 'Рендеров создано', value: '0', color: '#D4AF37' },
  { icon: Users, label: 'Подписчиков', value: '0', color: '#22c55e' }
]

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useTelegram()
  const { projects, connectedChannels, subscription } = useAppStore()
  const sortedProjects = [...projects].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-20">
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2481cc] to-[#D4AF37] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div><h1 className="text-xl font-bold">DubaiEstate AI</h1><p className="text-sm opacity-60">{user?.first_name || 'Пользователь'}</p></div>
          </div>
          <button onClick={() => navigate('/settings')} className="w-10 h-10 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center">
            <Settings size={20} />
          </button>
        </div>
        {subscription.status === 'active' && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-600 dark:text-green-400">Premium активен</span>
          </div>
        )}
      </header>

      <section className="px-6 mb-6">
        <div className="flex gap-3">
          <Button fullWidth size="large" onClick={() => navigate('/new-project')} leftIcon={<Plus size={20} />}>Новый проект</Button>
        </div>
      </section>

      <section className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] text-center">
              <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={16} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs opacity-60">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {connectedChannels.length > 0 && (
        <section className="px-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Подключенные каналы</h3>
            <button onClick={() => navigate('/settings')} className="text-sm opacity-60">Управление</button>
          </div>
          <div className="space-y-2">
            {connectedChannels.slice(0, 3).map((channel) => (
              <div key={channel.id} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--tg-theme-secondary-bg-color)]">
                <div className="w-10 h-10 rounded-full bg-[var(--tg-theme-button-color)] flex items-center justify-center">
                  <span className="text-white font-medium">{channel.title?.charAt(0) || 'К'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{channel.title}</p>
                  <p className="text-sm opacity-60 truncate">{channel.subscribersCount} подписчиков</p>
                </div>
                <ChevronRight size={20} className="opacity-40" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Ваши проекты</h3>
          {projects.length > 0 && <span className="text-sm opacity-60">{projects.length} проектов</span>}
        </div>
        {sortedProjects.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center mx-auto mb-4">
              <Building2 size={32} className="opacity-40" />
            </div>
            <h4 className="font-medium mb-2">Нет проектов</h4>
            <p className="text-sm opacity-60 mb-6">Создайте свой первый проект, загрузив чертеж квартиры</p>
            <Button onClick={() => navigate('/new-project')} leftIcon={<Plus size={18} />}>Создать проект</Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {sortedProjects.map((project, index) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <ProjectCard project={project} onClick={() => navigate(`/project/${project.id}`)} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/new-project')} className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
        style={{ backgroundColor: 'var(--tg-theme-button-color)', color: 'var(--tg-theme-button-text-color)' }}>
        <Plus size={24} />
      </motion.button>
    </motion.div>
  )
}

export default Dashboard
