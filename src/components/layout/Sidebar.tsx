import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  PhoneCall,
  LineChart,
  PackageCheck,
} from 'lucide-react'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/pipeline', label: 'Pipeline', icon: KanbanSquare },
  { to: '/prospects', label: 'Prospects', icon: Users },
  { to: '/calls', label: 'Calls', icon: PhoneCall },
  { to: '/revenus', label: 'Revenus', icon: LineChart },
  { to: '/livraison', label: 'Livraison', icon: PackageCheck },
]

export const Sidebar = () => {
  return (
    <aside className="fixed inset-y-0 left-0 w-60 border-r border-border-subtle bg-[#050816] px-5 py-6">
      <div className="mb-8 flex items-center gap-3">
        <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent-cyan to-accent-violet shadow-glow-cyan">
          <span className="text-lg font-semibold text-black">AI</span>
          <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-accent-cyan shadow-glow-cyan" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-wide text-text-primary">
            CRM IA
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-text-muted">
            B2B services locaux
          </span>
        </div>
      </div>

      <nav className="space-y-1 text-sm">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200',
                  isActive
                    ? 'bg-[#1f2937] text-text-primary border-l-4 border-accent-cyan'
                    : 'text-text-muted hover:bg-[#111827] hover:text-text-primary border-l-4 border-transparent',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={
                      'h-4 w-4 flex-shrink-0 ' +
                      (isActive ? 'text-accent-cyan' : 'text-text-muted group-hover:text-accent-cyan')
                    }
                  />
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}

