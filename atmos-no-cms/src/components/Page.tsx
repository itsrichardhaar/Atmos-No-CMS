import type { PropsWithChildren } from "react"

export default function Page({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{title}</h1>
      {children}
    </section>
  )
}
