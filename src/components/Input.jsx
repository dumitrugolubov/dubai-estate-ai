import { forwardRef } from 'react'

const Input = forwardRef(({
  label, type = 'text', placeholder, value, onChange, error,
  disabled = false, required = false, className = '', leftIcon, rightIcon, ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
      <div className="relative">
        {leftIcon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{leftIcon}</div>}
        <input ref={ref} type={type} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder}
          className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent text-[var(--tg-theme-text-color)] placeholder:text-[var(--tg-theme-hint-color)] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-500 focus:border-red-500' : 'border-[var(--tg-theme-secondary-bg-color)] focus:border-[var(--tg-theme-button-color)]'}
            ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`} {...props} />
        {rightIcon && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</div>}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'

export const Textarea = forwardRef(({
  label, placeholder, value, onChange, error,
  disabled = false, required = false, rows = 4, className = '', ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
      <textarea ref={ref} value={value} onChange={onChange} disabled={disabled} placeholder={placeholder} rows={rows}
        className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent resize-none text-[var(--tg-theme-text-color)] placeholder:text-[var(--tg-theme-hint-color)] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? 'border-red-500 focus:border-red-500' : 'border-[var(--tg-theme-secondary-bg-color)] focus:border-[var(--tg-theme-button-color)]'}`} {...props} />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export const Select = forwardRef(({
  label, options = [], value, onChange, error,
  disabled = false, required = false, placeholder = 'Выберите...', className = '', ...props
}, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>}
      <select ref={ref} value={value} onChange={onChange} disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border-2 bg-transparent text-[var(--tg-theme-text-color)] focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer appearance-none pr-10
          ${error ? 'border-red-500 focus:border-red-500' : 'border-[var(--tg-theme-secondary-bg-color)] focus:border-[var(--tg-theme-button-color)]'}
          bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")] bg-[length:24px] bg-[right_12px_center] bg-no-repeat`} {...props}>
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (<option key={option.value} value={option.value}>{option.label}</option>))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
})

Select.displayName = 'Select'

export default Input
