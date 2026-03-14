export default function EmptyState({ message = 'Nenhum item encontrado.' }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon">📋</span>
      <p className="empty-state__message">{message}</p>
    </div>
  )
}
