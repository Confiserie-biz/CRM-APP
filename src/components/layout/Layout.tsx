import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-screen bg-bg-main text-text-primary">
      <Sidebar />
      <main className="ml-60 flex-1 bg-bg-main px-8 py-8">
        <div className="mx-auto max-w-7xl space-y-6">{children}</div>
      </main>
    </div>
  )
}

