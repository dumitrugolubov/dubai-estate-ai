import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const Button = forwardRef(({
  children, variant = 'primary', size = 'medium', fullWidth = false,
  disabled = false, loading = false, leftIcon, rightIcon, onClick, className = '', ...props
}, ref) => {
  const baseStyles = `inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95`

  const variants = {
    primary: `bg-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-text-color)] hover:opacity-90`,
    secondary: `bg-[var(--tg-theme-secondary-bg-color)] text-[var(--tg-theme-text-color)] hover:brightness-95`,
    outline: `border-2 border-[var(--tg-theme-button-color)] text-[var(--tg-theme-button-color)] bg-transparent hover:bg-[var(--tg-theme-button-color)] hover:text-[var(--tg-theme-button-text-color)]`,
    ghost: `bg-transparent text-[var(--tg-theme-text-color)] hover:bg-[var(--tg-theme-secondary-bg-color)]`,
    danger: `bg-red-500 text-white hover:bg-red-600`,
    success: `bg-green-500 text-white hover:bg-green-600`
  }

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2.5 text-base',
    large: 'px-6 py-3.5 text-lg'
  }

  return (
    <motion.button ref={ref} whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading} onClick={onClick} {...props}>
      {loading ? (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (<>{leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}{children}{rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}</>)}
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button
