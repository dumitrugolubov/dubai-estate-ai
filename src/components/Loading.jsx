import { Loader2 } from 'lucide-react'

const Loading = ({ message = 'Загрузка...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="animate-spin mb-4">
        <Loader2 size={48} style={{ color: 'var(--tg-theme-button-color)' }} />
      </div>
      <p className="text-center animate-pulse" style={{ color: 'var(--tg-theme-text-color)' }}>{message}</p>
    </div>
  )
}

export default Loading
