import { Navbar } from "@/components/admin-panel/navbar"

interface ContentLayoutProps {
  children: React.ReactNode
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Navbar />
      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto bg-background px-4 pt-8 pb-8 sm:px-8 lg:flex">
        {children}
      </div>
    </div>
  )
}
