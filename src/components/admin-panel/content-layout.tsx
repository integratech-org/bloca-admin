import { Navbar } from "@/components/admin-panel/navbar"

interface ContentLayoutProps {
  children: React.ReactNode
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col lg:h-dvh lg:overflow-hidden">
      <Navbar />
      <div className="flex-1 scrollbar-none bg-background px-4 pt-8 pb-8 sm:px-8 lg:flex lg:min-h-0 lg:overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
