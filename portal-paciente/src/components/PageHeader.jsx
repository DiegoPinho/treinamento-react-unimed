export default function PageHeader({ title, subtitle, children }) {
  return (
    <div className="page-header">
      <div>
        <h2 className="page-header__title">{title}</h2>
        {subtitle && <p className="page-header__subtitle">{subtitle}</p>}
      </div>
      {children && <div className="page-header__actions">{children}</div>}
    </div>
  )
}
