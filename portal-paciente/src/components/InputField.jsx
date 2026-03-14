import React from 'react'

const InputField = React.memo(function InputField({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  ...props
}) {
  return (
    <div className={`input-field ${error ? 'input-field--error' : ''}`}>
      {label && <label className="input-field__label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field__input"
        {...props}
      />
      {error && <span className="input-field__error">{error}</span>}
    </div>
  )
})

export default InputField
