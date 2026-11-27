import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router"
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { type QueryClient } from "@tanstack/react-query"
import { Toaster } from "sonner"
import Providers from "./-providers"
import { userFn, userKey } from "@/lib/auth"

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    beforeLoad: async ({ context }) => {
      const session = await context.queryClient.ensureQueryData({
        queryKey: userKey,
        queryFn: userFn,
      })
      return { session }
    },
    component: RootComponent,
    notFoundComponent: () => {
      return (
        <div className="flex h-screen w-full flex-col items-center justify-center overflow-hidden">
          <p>This is the notFoundComponent configured on root route</p>
          <Link to="/">Start Over</Link>
        </div>
      )
    },
  }
)

function RootComponent() {
  return (
    <Providers>
      <Outlet />
      <Toaster />
      {/* <TanStackRouterDevtools position="bottom-right" /> */}
    </Providers>
  )
}
