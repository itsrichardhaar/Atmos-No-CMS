// src/components/Section.tsx
export default function Section({
  title, subtitle, children,
}: { title?: string; subtitle?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="container">
        {(title || subtitle) && (
          <header className="section-header">
            {subtitle && <div className="section-sub">{subtitle}</div>}
            {title && <h2 className="section-title">{title}</h2>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
