import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTelegram } from '../context/TelegramContext'
import { useAppStore } from '../store/useAppStore'
import Button from '../components/Button'
import Input, { Textarea, Select } from '../components/Input'
import { ArrowLeft, RefreshCw, Image as ImageIcon, FileText, Send, Download, Wand2, Palette } from 'lucide-react'

const styleOptions = [
  { value: 'modern', label: 'Современный' },
  { value: 'luxury', label: 'Люкс' },
  { value: 'minimalist', label: 'Минимализм' },
  { value: 'arabic', label: 'Арабский стиль' },
  { value: 'scandinavian', label: 'Скандинавский' }
]

const ProjectEditor = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showAlert } = useTelegram()
  const { projects, updateProject, connectedChannels } = useAppStore()
  const project = projects.find(p => p.id === id)
  const [activeTab, setActiveTab] = useState('render')
  const [selectedStyle, setSelectedStyle] = useState('modern')
  const [selectedChannel, setSelectedChannel] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [description, setDescription] = useState('Роскошная квартира в самом сердце Дубая с панорамным видом на залив. Современный дизайн, высококачественная отделка и просторные комнаты создают атмосферу комфорта и элегантности.')
  const [generatedImage, setGeneratedImage] = useState(null)

  if (!project && !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg mb-4">Проект не выбран</p>
          <Button onClick={() => navigate('/dashboard')}>Назад</Button>
        </div>
      </div>
    )
  }

  const handleGenerateRender = async () => {
    setIsGenerating(true)
    setTimeout(() => {
      setGeneratedImage('data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
          <rect fill="#e8e8e8" width="400" height="400"/>
          <rect fill="#2a5a8a" x="20" y="20" width="360" height="280"/>
          <rect fill="#87ceeb" x="40" y="40" width="100" height="80" opacity="0.5"/>
          <rect fill="#87ceeb" x="160" y="40" width="100" height="80" opacity="0.5"/>
          <rect fill="#8b4513" x="40" y="180" width="120" height="100"/>
          <rect fill="#4a90a4" x="200" y="180" width="160" height="100"/>
          <text x="200" y="350" text-anchor="middle" fill="#333" font-size="14">3D Render - ${selectedStyle}</text>
        </svg>
      `))
      setIsGenerating(false)
      showAlert('Демо: 3D рендер сгенерирован!')
    }, 2000)
  }

  const handleRegenerateText = () => {
    showAlert('Демо: Текст перегенерирован!')
  }

  const handlePostToChannel = () => {
    if (!selectedChannel) {
      showAlert('Выберите канал')
      return
    }
    showAlert('Демо: Опубликовано в канал!')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-24">
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center">
            <ArrowLeft size={20} /></button>
          <div className="flex-1 min-w-0"><h1 className="text-lg font-semibold truncate">Проект #{id?.slice(0, 8)}</h1><p className="text-sm opacity-60">Локация не указана</p></div>
        </div>
        <div className="flex gap-2 p-1 rounded-xl bg-[var(--tg-theme-secondary-bg-color)]">
          {[
            { id: 'render', icon: ImageIcon, label: 'Рендер' },
            { id: 'text', icon: FileText, label: 'Текст' },
            { id: 'post', icon: Send, label: 'Публикация' }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${activeTab === tab.id ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]' : 'opacity-60 hover:opacity-100'}`}>
              <tab.icon size={18} /><span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </header>
      <main className="px-6">
        <AnimatePresence mode="wait">
          {activeTab === 'render' && (
            <motion.div key="render" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs opacity-60">Чертеж</p>
                  <div className="aspect-square rounded-xl overflow-hidden bg-[var(--tg-theme-secondary-bg-color)]">
                    <div className="w-full h-full flex items-center justify-center"><ImageIcon size={32} className="opacity-40" /></div>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs opacity-60">3D Рендер</p>
                  <div className="aspect-square rounded-xl overflow-hidden bg-[var(--tg-theme-secondary-bg-color)] relative">
                    {generatedImage ? <img src={generatedImage} alt="3D" className="w-full h-full object-contain" /> : (
                      <div className="w-full h-full flex items-center justify-center">
                        {isGenerating ? <div className="animate-spin rounded-full h-8 w-8 border-2 border-[var(--tg-theme-button-color)] border-t-transparent" /> : <ImageIcon size={32} className="opacity-40" />}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[var(--tg-theme-secondary-bg-color)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2"><Palette size={18} /><span className="font-medium">Стиль рендера</span></div>
                  <span className="text-sm opacity-60">{styleOptions.find(s => s.value === selectedStyle)?.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {styleOptions.map((style) => (
                    <button key={style.value} onClick={() => setSelectedStyle(style.value)}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-all ${selectedStyle === style.value ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]' : 'bg-[var(--tg-theme-bg-color)] opacity-60 hover:opacity-100'}`}>
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button fullWidth variant="secondary" onClick={handleGenerateRender} loading={isGenerating} leftIcon={<RefreshCw size={18} />}>Обновить рендер</Button>
                <Button variant="secondary" onClick={() => {}} disabled={!generatedImage}><Download size={18} /></Button>
              </div>
            </motion.div>
          )}
          {activeTab === 'text' && (
            <motion.div key="text" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-medium">Описание объекта</label>
                  <button onClick={handleRegenerateText} className="text-sm flex items-center gap-1" style={{ color: 'var(--tg-theme-button-color)' }}>
                    <Wand2 size={14} />Перегенерировать
                  </button>
                </div>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={12} />
              </div>
              <Button fullWidth variant="outline" onClick={() => { navigator.clipboard.writeText(description); showAlert('Текст скопирован!') }} leftIcon={<Download size={18} />}>Копировать текст</Button>
            </motion.div>
          )}
          {activeTab === 'post' && (
            <motion.div key="post" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
              <div className="space-y-2">
                <label className="font-medium">Выберите канал</label>
                {connectedChannels.length === 0 ? (
                  <div className="p-6 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] text-center">
                    <p className="opacity-60 mb-4">Нет подключенных каналов</p>
                    <Button variant="outline" onClick={() => navigate('/settings')}>Подключить канал</Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {connectedChannels.map((channel) => (
                      <button key={channel.id} onClick={() => setSelectedChannel(channel.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${selectedChannel === channel.id ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]' : 'bg-[var(--tg-theme-secondary-bg-color)]'}`}>
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="font-medium">{channel.title?.charAt(0) || 'К'}</span>
                        </div>
                        <div className="flex-1 text-left"><p className="font-medium">{channel.title}</p><p className="text-sm opacity-60">{channel.subscribersCount} подписчиков</p></div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button fullWidth size="large" onClick={handlePostToChannel} disabled={!selectedChannel || !generatedImage} leftIcon={<Send size={20} />}>Опубликовать в канал</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  )
}

export default ProjectEditor
