import { ThemeProvider } from "@/components/providers/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider disableTransitionOnChange={false}>
      <TooltipProvider delay={100}>{children}</TooltipProvider>
    </ThemeProvider>
  )
}
