import { Navigation } from '@/components/navigation'

interface LayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  )
}
