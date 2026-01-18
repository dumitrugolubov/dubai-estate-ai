import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { useTelegram } from '../context/TelegramContext'
import Button from '../components/Button'
import Input, { Textarea, Select } from '../components/Input'
import { ArrowLeft, Upload, X, Home, MapPin, DollarSign } from 'lucide-react'

const steps = [
  { id: 'upload', title: 'Чертеж', icon: Upload },
  { id: 'details', title: 'Детали', icon: Home },
  { id: 'location', title: 'Локация', icon: MapPin },
  { id: 'price', title: 'Цена', icon: DollarSign }
]

const propertyTypes = [
  { value: 'apartment', label: 'Квартира' },
  { value: 'villa', label: 'Вилла' },
  { value: 'penthouse', label: 'Пентхаус' },
  { value: 'studio', label: 'Студия' },
  { value: 'townhouse', label: 'Таунхаус' }
]

const bedroomOptions = [
  { value: 'studio', label: 'Студия' },
  { value: '1', label: '1 спальня' },
  { value: '2', label: '2 спальни' },
  { value: '3', label: '3 спальни' },
  { value: '4', label: '4+ спальни' }
]

const bathroomOptions = [
  { value: '1', label: '1 санузел' },
  { value: '2', label: '2 санузла' },
  { value: '3', label: '3+ санузла' }
]

const styleOptions = [
  { value: 'modern', label: 'Современный' },
  { value: 'luxury', label: 'Люкс' },
  { value: 'minimalist', label: 'Минимализм' },
  { value: 'arabic', label: 'Арабский стиль' },
  { value: 'scandinavian', label: 'Скандинавский' }
]

const NewProject = () => {
  const navigate = useNavigate()
  const { showAlert } = useTelegram()
  const [currentStep, setCurrentStep] = useState(0)
  const [projectData, setProjectData] = useState({
    blueprint: null, blueprintPreview: null,
    propertyType: '', bedrooms: '', bathrooms: '', size: '', sizeUnit: 'sqft',
    location: '', tower: '', community: '',
    price: '', currency: 'AED', renderStyle: 'modern'
  })

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file?.size > 10 * 1024 * 1024) {
      showAlert('Файл слишком большой. Максимальный размер: 10 МБ')
      return
    }
    const previewUrl = URL.createObjectURL(file)
    setProjectData(prev => ({ ...prev, blueprint: file, blueprintPreview: previewUrl }))
  }, [showAlert])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'], 'application/pdf': ['.pdf'] }, maxFiles: 1, multiple: false
  })

  const handleNext = () => { if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1) }
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    } else {
      navigate(-1)
    }
  }

  const handleSubmit = async () => {
    showAlert('Демо-режим: Проект сохранен локально')
    navigate('/dashboard')
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return (
        <div className="space-y-4">
          <div className="text-center mb-6"><h2 className="text-xl font-bold mb-2">Загрузите чертеж</h2><p className="text-sm opacity-60">Загрузите план квартиры для создания 3D визуализации</p></div>
          <AnimatePresence mode="wait">
            {projectData.blueprintPreview ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--tg-theme-secondary-bg-color)]">
                  <img src={projectData.blueprintPreview} alt="Чертеж" className="w-full h-full object-contain" />
                </div>
                <button onClick={() => setProjectData(prev => ({ ...prev, blueprint: null, blueprintPreview: null }))}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"><X size={16} /></button>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} {...getRootProps()}
                className={`aspect-[4/3] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-200
                  ${isDragActive ? 'border-[var(--tg-theme-button-color)] bg-[var(--tg-theme-button-color)]/10' : 'border-[var(--tg-theme-hint-color)] hover:border-[var(--tg-theme-button-color)]'}`}>
                <input {...getInputProps()} />
                <div className="w-16 h-16 rounded-full bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center">
                  <Upload size={28} className="opacity-60" />
                </div>
                <div className="text-center"><p className="font-medium mb-1">{isDragActive ? 'Отпустите файл' : 'Перетащите файл сюда'}</p><p className="text-sm opacity-60">или нажмите для выбора</p></div>
                <p className="text-xs opacity-40">Поддерживает: JPG, PNG, PDF (до 10 МБ)</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )
      case 1: return (
        <div className="space-y-4">
          <div className="text-center mb-6"><h2 className="text-xl font-bold mb-2">Основные детали</h2><p className="text-sm opacity-60">Укажите характеристики объекта</p></div>
          <Select label="Тип недвижимости" options={propertyTypes} value={projectData.propertyType}
            onChange={(e) => setProjectData(prev => ({ ...prev, propertyType: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Спальни" options={bedroomOptions} value={projectData.bedrooms}
              onChange={(e) => setProjectData(prev => ({ ...prev, bedrooms: e.target.value }))} required />
            <Select label="Санузлы" options={bathroomOptions} value={projectData.bathrooms}
              onChange={(e) => setProjectData(prev => ({ ...prev, bathrooms: e.target.value }))} required />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Input label="Площадь" type="number" placeholder="1200" value={projectData.size}
                onChange={(e) => setProjectData(prev => ({ ...prev, size: e.target.value }))} required />
            </div>
            <Select label="Ед. изм." options={[{ value: 'sqft', label: 'кв. фут' }, { value: 'sqm', label: 'кв. м' }]}
              value={projectData.sizeUnit} onChange={(e) => setProjectData(prev => ({ ...prev, sizeUnit: e.target.value }))} />
          </div>
        </div>
      )
      case 2: return (
        <div className="space-y-4">
          <div className="text-center mb-6"><h2 className="text-xl font-bold mb-2">Расположение</h2><p className="text-sm opacity-60">Укажите локацию объекта</p></div>
          <Input label="Район / Сообщество" placeholder="например, Downtown Dubai" value={projectData.community}
            onChange={(e) => setProjectData(prev => ({ ...prev, community: e.target.value }))} required />
          <Input label="Башня / Комплекс" placeholder="например, Burj Khalifa" value={projectData.tower}
            onChange={(e) => setProjectData(prev => ({ ...prev, tower: e.target.value }))} />
          <Select label="Стиль рендера" options={styleOptions} value={projectData.renderStyle}
            onChange={(e) => setProjectData(prev => ({ ...prev, renderStyle: e.target.value }))} required />
        </div>
      )
      case 3: return (
        <div className="space-y-4">
          <div className="text-center mb-6"><h2 className="text-xl font-bold mb-2">Цена</h2><p className="text-sm opacity-60">Укажите цену объекта</p></div>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Input label="Цена" type="number" placeholder="500000" value={projectData.price}
                onChange={(e) => setProjectData(prev => ({ ...prev, price: e.target.value }))} required />
            </div>
            <Select label="Валюта" options={[{ value: 'AED', label: 'AED' }, { value: 'USD', label: 'USD' }, { value: 'EUR', label: 'EUR' }]}
              value={projectData.currency} onChange={(e) => setProjectData(prev => ({ ...prev, currency: e.target.value }))} />
          </div>
        </div>
      )
      default: return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pb-24">
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={handleBack} className="w-10 h-10 rounded-xl bg-[var(--tg-theme-secondary-bg-color)] flex items-center justify-center">
            <ArrowLeft size={20} /></button>
          <div className="flex-1"><h1 className="text-lg font-semibold">Новый проект</h1><p className="text-sm opacity-60">Шаг {currentStep + 1} из {steps.length}</p></div>
        </div>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                ${index <= currentStep ? 'bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)]' : 'bg-[var(--tg-theme-secondary-bg-color)] opacity-40'}`}>
                {index < currentStep ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : step.icon && <step.icon size={14} />}
              </div>
              {index < steps.length - 1 && <div className={`w-8 h-0.5 mx-1 ${index < currentStep ? 'bg-[var(--tg-theme-button-color)]' : 'bg-[var(--tg-theme-secondary-bg-color)]'}`} />}
            </div>
          ))}
        </div>
      </header>
      <main className="px-6">
        <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          {renderStepContent()}
        </motion.div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <div className="flex gap-3">
          {currentStep < steps.length - 1 ? (
            <Button fullWidth size="large" onClick={handleNext} disabled={currentStep === 0 && !projectData.blueprint}>Продолжить</Button>
          ) : (
            <Button fullWidth size="large" onClick={handleSubmit} disabled={!projectData.price}>Создать проект</Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default NewProject
