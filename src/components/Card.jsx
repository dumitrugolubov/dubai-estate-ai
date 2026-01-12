import { motion } from 'framer-motion'

const Card = ({ children, className = '', padding = 'medium', hover = false, onClick, ...props }) => {
  const paddings = { none: '', small: 'p-3', medium: 'p-4', large: 'p-6' }
  const Component = hover ? motion.div : 'div'
  const animationProps = hover ? { whileHover: { scale: 1.02 }, transition: { duration: 0.2 } } : {}

  return (
    <Component className={`rounded-2xl bg-[var(--tg-theme-secondary-bg-color)] ${paddings[padding]} ${hover ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick} {...animationProps} {...props}>{children}
    </Component>
  )
}

export const ProjectCard = ({ project, onClick }) => {
  return (
    <Card hover onClick={onClick} className="overflow-hidden">
      <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
        {project.generatedImage ? (
          <img src={project.generatedImage} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        {project.status === 'processing' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent" />
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-1 truncate">{project.title || 'Без названия'}</h3>
      <p className="text-sm opacity-70">{project.location || 'Локация не указана'}</p>
    </Card>
  )
}

export default Card
