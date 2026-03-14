export default function DataCard({ children, className = '', onClick }) {
  return (
    <div className={`data-card ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}
