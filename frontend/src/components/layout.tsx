import { Navigation } from '@/components/navigation'

interface LayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      <Navigation />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto h-full py-4 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  )
}
